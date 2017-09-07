import React from "react";
import ImageWrapper from "./Image";
import Grid from "./Grid";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPins } from "../actions/pinActions";

class Home extends React.Component {
    constructor(props){
        super(props);
        if(!this.props.lastPinId)
            this.props.fetchPins();
        
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    handleLoadMore(){
        const { lastPinId } = this.props;
        this.props.fetchPins({ lastPinId });
    }

    render(){
        const pins = this.props.pins;
        return(
            <div className="container">
                <Grid gridItem={GridItem} data={pins} />
                <Button onClick={this.handleLoadMore}>Load More</Button>
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
                <ImageWrapper width={200} height={200} src={url} onImageLoaded={()=>{ finishedLoading() }} onImageError={()=>{ finishedLoading() }} ></ImageWrapper>
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