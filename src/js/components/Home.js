import React from "react";
import ImageWrapper from "./Image";
import Grid from "./Grid";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import Message from "./Message";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPins } from "../actions/pinActions";

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loadingImages: (props.pins.length > 0) // if there already preloaded pins show loading indicator while images are loading up
        }

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleFinishedLoadingImages = this.handleFinishedLoadingImages.bind(this);
        
        if(!this.props.lastPinId)
            this.props.fetchPins();
        
        if(this.props.lastPinId && this.props.pins.length < 12)
            this.handleLoadMore();

    }

    handleLoadMore(){
        const { lastPinId } = this.props;
        this.props.fetchPins({ lastPinId });
        
    }

    componentWillReceiveProps(nextProps){
        if(this.props.pins.length !== nextProps.pins.length)
            this.setState({ loadingImages: true });
    }

    handleFinishedLoadingImages(){
        this.setState({ loadingImages: false });
    }

    render(){
        const pins = this.props.pins;
        const isLoading = (this.props.loading || this.state.loadingImages);
        const error = this.props.error;
        return(
            <div className="text-center">
                <Grid gridItem={GridItem} data={pins} sequentialLoad={true} finishedLoading={this.handleFinishedLoadingImages} />
                <Loader disabled={!isLoading}/>
                <Message.Error active={!!error} title="Failed to retrieve pins" content={error} />
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
                <ImageWrapper className="grid-image" width={230} height={230} useImagePlaceholder={true} src={url} onImageLoaded={()=>{ finishedLoading() }} onImageError={()=>{ finishedLoading() }} ></ImageWrapper>
                <div className="caption">
                    <h4>{description}</h4>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        pins: state.pin.pins,
        loading: state.pin.fetchingPins,
        error: state.pin.fetchPinsFailed,
        lastPinId: state.pin.lastPinId
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchPins }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);