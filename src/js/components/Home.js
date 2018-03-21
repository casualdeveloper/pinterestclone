import React from "react";
import Grid from "./Grid";
import { Button, Loader, Modal, Card } from "../style_components";
import { PINS_IN_PAGE_DEFAULT } from "../constants/defaults";
import { PinGridItem } from "./PinGridItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPins } from "../actions/pinActions";

import PinModal from "./PinModal";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loadingImages: (props.pins.length > 0) // if there already preloaded pins show loading indicator while images are loading up
        };

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleFinishedLoadingImages = this.handleFinishedLoadingImages.bind(this);
        
        if(!this.props.lastPinId)
            this.props.fetchPins();
        
        if(this.props.lastPinId && this.props.pins.length < PINS_IN_PAGE_DEFAULT)
            this.handleLoadMore(this, PINS_IN_PAGE_DEFAULT - this.props.pins.length);
    }

    handleLoadMore(e, amountOfPins){
        const { lastPinId } = this.props;
        this.props.fetchPins({ lastPinId, amountOfPins });
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
        pins: state.pin.pins,
        loading: state.pin.fetchingPins,
        error: state.pin.fetchPinsFailed,
        lastPinId: state.pin.lastPinId
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchPins }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);