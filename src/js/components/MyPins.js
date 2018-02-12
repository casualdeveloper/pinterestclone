import React from "react";
import ImageWrapper from "./Image";
import Grid from "./Grid";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import UserPins from "./UserPins";
import { deletePin } from "../actions/pinActions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MyPins extends React.Component {
    constructor(props){
        super(props);
        this.deletePin = this.deletePin.bind(this);
    }

    deletePin(id, owner){
        this.props.deletePin({pinId: id, owner: owner});
        
    }

    render(){
        //wrap gridItem to pass pin delete function
        const gridItemWrapper = (props) => {
            return <GridItem delete={this.deletePin} {...props} />
        }
        return(
            <UserPins userId={this.props.userId} gridItem={gridItemWrapper}/>
        )
    }
}


class GridItem extends React.Component {
    render(){
        const { url, description, _id, owner } = this.props.data;
        const finishedLoading = this.props.finishedLoading;
        const deletePinHandler = () => { this.props.delete(_id, owner) }
        return (
            <div className="thumbnail custom-thumbnail">
                <ImageWrapper className="grid-image" width={230} height={230} src={url} useImagePlaceholder={true} onImageLoaded={()=>{ finishedLoading() }} onImageError={()=>{ finishedLoading() }} ></ImageWrapper>
                <div className="caption">
                    <h4>{description}</h4>
                    <div onClick={deletePinHandler}><i className="fa fa-trash-o" aria-hidden="true"></i></div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        userId: state.user.id
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ deletePin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPins);