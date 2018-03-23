import React from "react";
import { Button, Loader, Modal, Card } from "../style_components";
import ImageWrapper from "./Image";
import DefaultAvatar from "../../img/default-avatar.jpg";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { deletePin, likePin, unlikePin } from "../actions";

const Identicon = require("identicon.js");

const defaultState = (props) => {
    const pinId = props.data._id;
    const pinnedByUser = props.pinned;

    let isPinnedByUser = false;
    if(pinnedByUser && pinnedByUser instanceof Array)
        isPinnedByUser = pinnedByUser.indexOf(pinId) !== -1
    
    
    let pinnedByCounter = 0;
    if(props.data.pinnedBy && props.data.pinnedBy instanceof Array)
        pinnedByCounter = props.data.pinnedBy.length;


    return {
        isPinnedByUser,
        pinnedByCounter
    }
}

class PinModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState(props);

        this.redirectToUser = this.redirectToUser.bind(this);
        this.deletePin = this.deletePin.bind(this);
        this.onPinClickHandler = this.onPinClickHandler.bind(this);
    }

    redirectToUser() {
        const userId = this.props.data.owner._id;
        if((this.props.match.params && this.props.match.params.userId === userId) || this.props.match.url === "/mypins") return;

        this.props.history.push("/user/"+userId);
        this.props.hideModal();
    }

    deletePin() {
        const pinId = this.props.data._id;
        const owner = this.props.data.owner;
        this.props.deletePin({ pinId, owner });
    }

    onPinClickHandler() {
        const pinId = this.props.data._id;
        const owner = this.props.data.owner;
        const userId = this.props.userId;

        if(owner._id === userId)
            return;

        if(!this.state.isPinnedByUser){
            this.props.likePin({ pinId, owner });
            this.setState({ isPinnedByUser: !this.state.isPinnedByUser, pinnedByCounter: this.state.pinnedByCounter + 1 });
            return;
        }
        
        this.props.unlikePin({ pinId, owner });
        this.setState({ isPinnedByUser: !this.state.isPinnedByUser, pinnedByCounter: this.state.pinnedByCounter - 1 });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.open !== this.props.open
        || nextProps.data._id !== this.props.data._id
        || this.state.isPinnedByUser !== nextState.isPinnedByUser
        || this.state.pinnedByCounter !== nextState.pinnedByCounter)
            return true;
        return false;
    }

    render() {
        const { url, description, owner } = this.props.data;
        const userId = this.props.userId;

        const { isPinnedByUser } = this.state;

        const dateString = getDate(this.props.data.creationDate);
        
        let avatar = owner.profileImage;
        if(!avatar){
            const identicon = new Identicon(owner._id, { size: 50, margin: 0.15, format: "svg" }).toString();
            avatar = `data:image/svg+xml;base64,${identicon}`;
        }

        let deleteButton = null;
        if(userId === owner._id)
            deleteButton = (<i onClick={this.deletePin} className="ml-6 delete-icon fa fa-trash fa-2x" />);

        const pinIconClass = getPinIconClass(this.state.isPinnedByUser, owner._id, userId);

        //console.log(this.props);
        
        return (
            <Modal open={this.props.open} >
                <div className="container my-auto">
                    <div className="row">
                        <div className="[ col-lg-4 col-lg-offset-4 ] [ col-md-6 col-md-offset-3 ] [ col-sm-8 col-sm-offset-2 ] [ col-xs-12 ]">
                            <Card>
                                <Card.Media>
                                    <ImageWrapper src={url} ></ImageWrapper>
                                </Card.Media>
                                <Card.Header>
                                    <img className="pin__modal__avatar" onClick={this.redirectToUser} src={avatar} alt={DefaultAvatar} />
                                    <Card.Header.TextContainer>
                                        <Card.Header.Title className="pin__modal__title" onClick = {this.redirectToUser} > {owner.displayName} </Card.Header.Title>
                                        <Card.Header.Subtitle> {dateString} </Card.Header.Subtitle>
                                    </Card.Header.TextContainer>
                                    <div className="card__header__icon ml-auto my-auto">
                                        <i onClick={this.onPinClickHandler} className={pinIconClass} aria-hidden="true" />
                                        <div className="my-auto ml-3">
                                            {this.state.pinnedByCounter}
                                        </div>
                                        {deleteButton}
                                    </div>
                                </Card.Header>
                                <Card.Text className="py-5">
                                    {description}
                                </Card.Text>
                                <Card.Action>
                                    <Button className="m-0 ml-auto" flat onClick={this.props.hideModal}>close</Button>
                                </Card.Action>
                            </Card>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
};

const getPinIconClass = (isPinnedByUser, pinOwnerId, userId) => {
    let pinIconClass = "pin-icon fa fa-pinterest-p fa-2x ";
    if(pinOwnerId === userId)
        return pinIconClass += "disabled"
    if(isPinnedByUser)
        return pinIconClass += "active";
    return pinIconClass;
}

const getDate = (str) => {
    const date  = new Date(str);
    const year  = date.getFullYear();
    const month = (date.getMonth() < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const day   = (date.getDate() < 10 ) ? "0" +  date.getDate()       : date.getDate();
    return `${year}-${month}-${day}`;
}

PinModal.propTypes = {
    data: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    userId: PropTypes.string,
    deletePin: PropTypes.func,
    pinned: PropTypes.array
}


function mapStateToProps(state){
    return {
        userId: state.user.id,
        pinned: state.user.pinned
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ deletePin, likePin, unlikePin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PinModal);

export { PinModal };