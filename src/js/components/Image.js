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
            imageFinishedLoading: false, //to determine if current image finished loading and we can call our callbacks
            useImagePlaceholder: props.useImagePlaceholder || false,
            orgWidth: 0,
            orgHeight: 0
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
            this.setState({
                imageLoading: false, 
                imageLoadingError: false, 
                imageFinishedLoading: true,
                orgHeight: newImage.naturalHeight,
                orgWidth: newImage.naturalWidth
            },() => {
                if(this.props.onImageLoaded)
                    this.props.onImageLoaded();
            })
        };
        

        newImage.onerror = () => {
            this.setState({
                imageLoadingError: true,
                imageLoading: false,
                imageFinishedLoading: true,
                orgHeight: this.state.height,
                orgWidth: this.state.width
            }, () => {
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

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.src !== nextState.src 
        || this.state.imageLoading !== nextState.imageLoading
        || this.state.imageLoadingError !== nextState.imageLoadingError
        || this.state.imageFinishedLoading !== nextState.imageFinishedLoading)
            return true;
        return false;
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
            <ImagePlaceholder {...this.state}>
                <BootstrapImage id={this.props.id} className={this.props.className} src={src} responsive></BootstrapImage>
            </ImagePlaceholder>
        );
    }
}

const ImagePlaceholder = (props) => {
    if(props.useImagePlaceholder){
        const {orgHeight, orgWidth} = props;
        let paddingPrecentage = orgHeight / orgWidth * 100 + "%";//we set padding at bottom to keep image aspect ration
        let widthCSS = "width: " + orgWidth + "px;";
        let paddingCSS = "padding-bottom:" + paddingPrecentage + ";";
        return (
            <div style="position:relative;">
                <div style="position:absolute; width:100%;">
                    {props.children}
                </div>
                <div className="image-placeholder" style={widthCSS + paddingCSS}>
                </div>
            </div>
        );
    }
    return props.children;
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