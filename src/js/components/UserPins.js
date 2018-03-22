import React from "react";
import Grid from "./Grid";
import { PINS_IN_PAGE_DEFAULT } from "../constants/defaults";
import { Loader, Button } from "../style_components";
import PinModal from "./PinModal";
import { PinGridItem } from "./PinGridItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserPins } from "../actions";

const getUserData = (users, userId) => {
    let returnUser = {pins: []};
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

};

class UserPins extends React.Component {
    constructor(props){
        super(props);

        let userId = props.userId || props.match.params.userId;
        let user = getUserData(props.users, userId);

        this.state = {
            pins: user.pins,
            userId: userId,
            lastPinId: user.lastPinId,
            loading: user.loading,
            error: user.error,
            loadingImages: (user.pins.length > 0) // if there already preloaded pins show loading indicator while images are loading up
        };
        
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleFinishedLoadingImages = this.handleFinishedLoadingImages.bind(this);

        if(!this.state.lastPinId)
            this.props.fetchUserPins({userId: this.state.userId});
        
        if(this.state.lastPinId && this.state.pins.length < PINS_IN_PAGE_DEFAULT)
            this.handleLoadMore(this, PINS_IN_PAGE_DEFAULT - this.state.pins.length);
    }

    handleLoadMore(e, amountOfPins){
        const { lastPinId, userId } = this.state;
        this.props.fetchUserPins({ lastPinId, userId, amountOfPins });
        
    }

    componentWillReceiveProps(nextProps){
        let nextUserId = nextProps.userId || nextProps.match.params.userId;
        let user = getUserData(nextProps.users, nextUserId);
        
        this.setState({
            pins: user.pins,
            loading: user.loading,
            error: user.error,
            lastPinId: user.lastPinId,
            userId: nextUserId,
            loadingImages: (nextUserId !== this.state.userId)
                            ?user.pins.length>0 //if this is a different user we set same value as we usually would do
                            :this.state.pins.length < user.pins.length,//if this is a same user we check if we are fetching more pins
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        let nextUserId = nextProps.userId || nextProps.match.params.userId;
        if( nextUserId !== this.state.userId ||
            nextState.pins && !this.state.pins ||
            nextState.pins.length !== this.state.pins.length ||
            nextState.loading !== this.state.loading ||
            nextState.error !== this.state.error ||
            nextState.lastPinId !== this.state.lastPinId ||
            nextState.loadingImages !== this.state.loadingImages)
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
            <div className="text-center mt-6">
                <Grid {...this.props} gridItem={PinGridItem} data={pins} sequentialLoad={true} finishedLoading={this.handleFinishedLoadingImages} />
                <Loader disabled={!isLoading}/>
                {(!isLoading)?<Button dark onClick={this.handleLoadMore}>Load More</Button>:null}
            </div>
        );
    }
}


function mapStateToProps(state){
    let users = state.users;
    return {
        users
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchUserPins }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPins);