import React from "react";
import Grid from "./Grid";
import { Button, Loader, Modal, Card } from "../style_components";
import { PINS_IN_PAGE_DEFAULT } from "../constants/defaults";
import { PinGridItem } from "./PinGridItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchLikedPins } from "../actions";

import PinModal from "./PinModal";

class Pinned extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loadingImages: (props.pins.length > 0) // if there already preloaded pins show loading indicator while images are loading up
        };

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleFinishedLoadingImages = this.handleFinishedLoadingImages.bind(this);
        
        if(!this.props.lastPinIndex)
            this.props.fetchLikedPins();
        
        if(this.props.lastPinIndex && this.props.pins.length < PINS_IN_PAGE_DEFAULT)
            this.handleLoadMore(this, PINS_IN_PAGE_DEFAULT - this.props.pins.length);
    }

    handleLoadMore(e, amountOfPins){
        const { lastPinIndex } = this.props;
        this.props.fetchLikedPins({ lastPinIndex, amountOfPins });
    }

    componentWillReceiveProps(nextProps){
        if(this.props.pins.length < nextProps.pins.length)
            this.setState({ loadingImages: true });
    }

    handleFinishedLoadingImages(){
        this.setState({ loadingImages: false });
    }

    render(){
        const pins = this.props.pins;
        const isLoading = (this.props.loading || this.state.loadingImages);

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
    return {
        pins: state.user.pinnedData.pins,
        loading: state.user.pinnedData.fetchingPins,
        lastPinIndex: state.user.pinnedData.lastPinIndex
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchLikedPins }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pinned);