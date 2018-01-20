import React from "react";
import ImageWrapper from "./Image";
import Grid from "./Grid";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserPins } from "../actions";

const getUserData = (users, userId) => {
    let returnUser = {pins: []}
    let user = users[userId];

    if(user && user.pins)
        returnUser.pins = user.pins;
    
    if(user && user.lastPinId)
        returnUser.lastPinId = user.lastPinId;

    if(user && user.fetchPinsPending)
        returnUser.loading = user.fetchPinsPending;

    if(user && user.fetchPinsFailed)
        returnUser.error = user.fetchPinsFailed;

    return returnUser;

}

class UserPins extends React.Component {
    constructor(props){
        super(props);

        let userId = props.userId;
        let user = getUserData(props.users, userId);

        this.state = {
            pins: user.pins,
            userId: userId,
            lastPinId: user.lastPinId,
            gridItem: props.gridItem || GridItem,
            loading: user.loading,
            error: user.error,
            loadingImages: (user.pins.length > 0) // if there already preloaded pins show loading indicator while images are loading up
        }
        
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleFinishedLoadingImages = this.handleFinishedLoadingImages.bind(this);

        if(!this.state.lastPinId)
            this.props.fetchUserPins({userId: this.state.userId});
        
        if(this.state.lastPinId && this.state.pins.length < 12)
            this.handleLoadMore();
    }

    handleLoadMore(){
        const { lastPinId, userId } = this.state;
        this.props.fetchUserPins({ lastPinId, userId });
        
    }

    componentWillReceiveProps(nextProps){
        let user = getUserData(nextProps.users, nextProps.userId);
        this.setState({
            pins: user.pins,
            loading: user.loading,
            error: user.loading,
            lastPinId: user.lastPinId,
            userId: nextProps.userId,
            loadingImages: (nextProps.userId !== this.state.userId)?user.pins.length>0:this.state.loadingImages,
            gridItem: nextProps.gridItem || GridItem
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        if( nextState.userId !== this.state.userId ||
            nextState.pins.length !== this.state.pins.length ||
            nextState.loading !== this.state.loading ||
            nextState.error !== this.state.error ||
            nextState.lastPinId !== this.state.lastPinId ||
            nextState.loadingImages !== this.state.loadingImages ||
            nextState.gridItem !== this.state.gridItem)
            return true;
        return false;
    }

    handleFinishedLoadingImages(){
        this.setState({ loadingImages: false });
    }

    render(){
        const pins = this.state.pins;
        const isLoading = (this.state.loading || this.state.loadingImages);
        return(
            <div className="text-center">
                <Grid gridItem={this.state.gridItem} data={pins} sequentialLoad={true} finishedLoading={this.handleFinishedLoadingImages} />
                <Loader disabled={!isLoading}/>
                {(!isLoading)?<Button onClick={this.handleLoadMore}>Load More</Button>:null}
            </div>
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
    let users = state.users;
    return {
        users
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchUserPins }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPins);