import React from "react";
import { Button, Loader, Modal, Card } from "../style_components";
import ImageWrapper from "./Image";
import DefaultAvatar from "../../img/default-avatar.jpg";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { deletePin } from "../actions";

const Identicon = require("identicon.js");

class PinModal extends React.Component {
    constructor(props){
        super(props);

        this.redirectToUser = this.redirectToUser.bind(this);
    }

    redirectToUser(){
        const userId = this.props.data.owner._id;
        if((this.props.match.params && this.props.match.params.userId === userId) || this.props.match.url === "/mypins") return;

        this.props.history.push("/user/"+userId);
        this.props.hideModal();
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.open !== this.props.open
        || nextProps.data._id !== this.props.data._id)
            return true;
        return false;
    }

    render() {
        const { url, description, owner } = this.props.data;

        const date = new Date(this.props.data.creationDate);
        const year  = date.getFullYear();
        const month = (date.getMonth() < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day   = (date.getDate() < 10 ) ? "0" +  date.getDate()       : date.getDate();
        const dateString = `${year}-${month}-${day}`;

        const identicon = new Identicon(owner._id, { size: 50, margin: 0.15, format: "svg" }).toString();
        const identiconImage = `data:image/svg+xml;base64,${identicon}`;

        const avatar = owner.profileImage || identiconImage;


        const deletePin = () => { this.props.deletePin({ pinId:this.props.data._id, owner }) };
        const deleteButton = (this.props.userId === owner._id)?(<i onClick={deletePin} className="ml-6 delete-icon fa fa-trash fa-2x" />):null;

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
                                        <i className="pin-icon fa fa-pinterest-p fa-2x" aria-hidden="true">
                                        </i>
                                        <div className="my-auto ml-3">
                                            654
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

PinModal.propTypes = {
    data: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    userId: PropTypes.string,
    deletePin: PropTypes.func
}


function mapStateToProps(state){
    return {
        userId: state.user.id
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ deletePin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PinModal);

export { PinModal };