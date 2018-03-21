import React from "react";
import { Loader } from "../style_components";

class ImageWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            orgWidth: 0,
            orgHeight: 0,

            alt: props.alt,
            src: props.src,

            imageError: false,
            imageLoading: false,
            imageFinishedLoading: false,

            onImageLoaded: props.onImageLoaded,
            onImageError: props.onImageError,
            onImageLoading: props.onImageLoading
        };

        this.loadImage = this.loadImage.bind(this);
        this.loadImage(this.state.src);
    }

    loadImage(src){
        // reset image loading error to allow loading image to appear
        this.setState({imageLoading: true, imageError: false});

        let newImage = new Image();
        
        newImage.src = src;

        newImage.decode().then(() => {
            
            this.setState({
                imageLoading: false, 
                imageError: false, 
                imageFinishedLoading: true,
                orgHeight: newImage.naturalHeight,
                orgWidth: newImage.naturalWidth
            },() => {
                if(this.props.onImageLoaded)
                    this.props.onImageLoaded();
            });
        }).catch(() => {
            this.setState({
                imageError: true,
                imageLoading: false,
                imageFinishedLoading: true,
                orgHeight: this.state.height,
                orgWidth: this.state.width
            }, () => {
                if(this.props.onImageError)
                    this.props.onImageError();
            });
        });
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
        || this.state.imageError !== nextState.imageError
        || this.state.imageFinishedLoading !== nextState.imageFinishedLoading)
            return true;
        return false;
    }

    render(){
        let { src, alt } = this.state;
        let { id, className } = this.props;

        if(this.state.imageLoading && this.state.onImageLoading){
            this.state.onImageLoading();
        }

        if(!this.state.src && !this.state.alt || this.state.imageError || this.state.imageLoading)
            return (<FallbackElement state={this.state} />);
        
        return (
            <img id={id} alt={alt} className={className} src={src} ></img>
        );
    }
}

const TextWrapper = (props) => {
    return (<span className="d-3 image-fallback-text">{props.children}</span>)
}

const FallbackElement = (props) => {
    let Element = null;

    (() => {
        if(!props.state.src && !props.state.alt){
            return Element = (<TextWrapper>No Image</TextWrapper>);
        }

        if(props.state.imageError){
            return Element = (<TextWrapper>Error</TextWrapper>) ;
        }

        if(props.state.imageLoading){
            return Element = (<Loader block blockLight dark />);
        }
    })();

    if(Element){
        let style = "";
        if(props.state.width){
            style += "width:" + props.state.width + "px;";
            style += "padding-top:" + props.state.width + "px;";
        }

        if(props.state.height){
            style += "padding-top:" + props.state.height + "px;";
        }
        
        return (
            <span className="image-fallback mx-auto text-center" style={style}>
                {Element}
            </span>
        );
    }

    return null;
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
};

const LoadingIndicator = (props) =>{
    return (
        <div id={props.id} className="loading-image-parent" style={{width: props.width, height: props.height, lineHeight: props.height+21+"px"}} > 
        {/* we add extra 20 to line height as offset for loader (half of its height) for it to be perfectly in center (should be adjusted if loader changes) */}
            <div className="loading-image" style={{width: props.width, height: props.height}}>
            </div>
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
    );
};

export default ImageWrapper;