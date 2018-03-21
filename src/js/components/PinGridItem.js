import React from "react";
import PropTypes from "prop-types";
import ImageWrapper from "./Image";
import PinModal from "./PinModal";

class PinGridItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false
        }
    }

    render(){
        const { url, description, owner } = this.props.data;
        const finishedLoading = this.props.finishedLoading;
        const onClickHandler = () => { this.setState({ showModal: true }) };
        const hideModal = () => { this.setState({ showModal: false }) };
        return (
            <div className="grid-cell" onClick={onClickHandler}>
                <ImageWrapper
                    className="grid-cell--image"
                    width={230}
                    height={230}
                    src={url}
                    onImageLoaded={()=>{ finishedLoading(); }}
                    onImageError={()=>{ finishedLoading(); }}
                />
                <div className="grid-cell--footer">
                    <div className="text-container">
                        <div className="line-1">{description}</div>
                    </div>
                    <div className="icon"><i class="pin-icon fa fa-pinterest-p fa-lg" aria-hidden="true"></i></div>
                </div>
                <PinModal {...this.props} data={this.props.data} open={this.state.showModal} hideModal={hideModal}/>
            </div>
        );
    }
}

PinGridItem.propTypes = {
    data: PropTypes.object.isRequired,
    finishedLoading: PropTypes.func.isRequired,
}

export default PinGridItem;
export { PinGridItem };