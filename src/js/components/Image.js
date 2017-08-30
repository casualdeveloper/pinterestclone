import React from "react";
import { Image as BootstrapImage } from "react-bootstrap";

const defaultFallbackImage = (width = 180, height = 180) => {
    return `https://dummyimage.com/${width}x${height}/c4c4c4/666666.jpg&text=no+image`;
}

const defaultLoadingImage = (width = 180, height = 180) => {
    return `https://dummyimage.com/${width}x${height}/c4c4c4/666666.jpg&text=Loading...`;
}

const defaultErrorImage = (width = 180, height = 180) => {
    return `https://dummyimage.com/${width}x${height}/c4c4c4/666666.jpg&text=Error`;
}

class ImageWrapper extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            width: props.width || 180,
            height: props.height || 180,
            fallbackImage: props.default || defaultFallbackImage(this.width, this.height),
            loadingImage: props.loadingImage || defaultLoadingImage(this.width, this.height),
            errorImage: props.errorImage || defaultErrorImage(this.width, this.height),
            src: props.src || defaultFallbackImage(this.width, this.height),
            imageLoadingError: false,
            imageLoading: false
        }

        this.loadImage = this.loadImage.bind(this);
    }

    loadImage(src){
        //if src is empty reset image state
        if(src === ""){
            this.setState({ src: this.state.fallbackImage, imageLoading: false, imageLoadingError: false });
            return;
        }

        // reset image loading error to allow loading image to appear
        this.setState({imageLoading: true, imageLoadingError: false});

        let newImage = new Image();
        let this2 = this;
        newImage.src = src;

        newImage.addEventListener("load", function() {
            this2.setState({imageLoading: false, imageLoadingError: false});
        }, false);

        newImage.addEventListener("error", function() {
            this2.setState({ imageLoadingError: true, imageLoading: false });
        }, false);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.src !== this.props.src){
            this.setState({src: nextProps.src});
            this.loadImage(nextProps.src);
        }
    }

    render(){
        let src = this.state.src;

        if(this.state.imageLoading)
            src = this.state.loadingImage;
        if(this.state.imageLoadingError)
            src = this.state.errorImage;

        return (
            <BootstrapImage id={this.props.id} className={this.props.className} width={this.props.width} height={this.props.height} src={src} responsive></BootstrapImage>
        );
    }
}

export default ImageWrapper;