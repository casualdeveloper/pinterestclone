import React from "react";
import ImageWrapper from "./Image";
import Grid from "./Grid";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import UserPins from "./UserPins";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MyPins extends React.Component {
    render(){
        return(
            <UserPins userId={this.props.userId}/>
        )
    }
}


class GridItem extends React.Component {
    render(){
        const { url, description } = this.props.data;
        const finishedLoading = this.props.finishedLoading;
        return (
            <div className="thumbnail custom-thumbnail">
                <ImageWrapper width={230} height={230} src={url} onImageLoaded={()=>{ finishedLoading() }} onImageError={()=>{ finishedLoading() }} ></ImageWrapper>
                <div className="caption">
                    <h4>{description}</h4>
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
    return bindActionCreators({ fetchUserPins }, dispatch);
}

export default connect(mapStateToProps)(MyPins);