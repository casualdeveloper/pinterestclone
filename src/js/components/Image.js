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

let loadingImage;
let errorImage;

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
            imageLoading: false,
            usePictureForLoader: props.usePictureForLoader || false,
            onImageLoaded: props.onImageLoaded,
            onImageError: props.onImageError,
            onImageLoading: props.onImageLoading,
            imageFinishedLoading: false //to determine if current image finished loading and we can call our callbacks
        }

        //callbacks save preloaded image to variable 
        //in case if its not use browser wouldn't delete it
        if(this.usePictureForLoader)
            this.preloadImage(this.state.loadingImage, (img) => {loadingImage = img});

        this.preloadImage(this.state.errorImage, (img) => {errorImage = img});

        this.loadImage = this.loadImage.bind(this);
        this.loadImage(this.state.src);
    }

    preloadImage(src, cb){
        let newImage = new Image();
        newImage.src = src;
        newImage.addEventListener("load", cb(newImage));
        newImage.addEventListener("error", cb(newImage));
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

        newImage.onload = () => {
            this.setState({imageLoading: false, imageLoadingError: false, imageFinishedLoading: true},() => {
                if(this.props.onImageLoaded)
                    this.props.onImageLoaded();
            })
        };
        

        newImage.onerror = () => {
            this.setState({ imageLoadingError: true, imageLoading: false, imageFinishedLoading: true }, () => {
                if(this.props.onImageError)
                    this.props.onImageError();
            });
        }
        
        newImage.src = src;
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.src !== this.props.src){
            this.setState({src: nextProps.src});
            this.loadImage(nextProps.src);
        }
    }

    render(){
        let src = this.state.src;

        if(this.state.imageLoading && this.state.onImageLoading){
            this.state.onImageLoading();
        }
        
        if(this.state.imageLoading && !this.state.usePictureForLoader)
            return (<LoadingIndicator height={this.state.height} width={this.state.width} id={this.props.id} />)
        if(this.state.imageLoading && this.state.usePictureForLoader)
            src = this.state.loadingImage;
        if(this.state.imageLoadingError)
            src = this.state.errorImage;

        return (
            <BootstrapImage id={this.props.id} className={this.props.className} width={this.props.width} height={this.props.height} src={src} responsive></BootstrapImage>
        );
    }
}

const LoadingIndicator = (props) =>{
    return (
        <div id={props.id} className="loading-image-parent" style={{width: props.width, height: props.height, lineHeight: props.height+21+"px"}} > 
        {/* we add extra 20 to line height as offset for loader (half of its height) for it to be perfectly in center (should be adjusted if loader changes) */}
            <div className="loading-image" style={{width: props.width, height: props.height}}>
            </div>
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
    )
}

export default ImageWrapper;