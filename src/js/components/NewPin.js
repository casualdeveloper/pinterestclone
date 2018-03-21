import React from "react";
import ImageWrapper from "./Image";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newPin, newPinError, newPinMessage, newSnackbarMessage } from "../actions";
import { Button, Loader, Card, Input } from "../style_components";

class NewPin extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            url: "",
            description: "",
            imageLoading: false,
            imageLoadingError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleImageLoading = this.handleImageLoading.bind(this);
        this.handleImageLoadingError = this.handleImageLoadingError.bind(this);
        this.handleImageLoadingSuccess = this.handleImageLoadingSuccess.bind(this);
    }

    handleInputChange(e) {
        //id is used to identify input eg.:"e.target.id": "password" <- identifies that changed input field is password
        let id = e.target.id;
        let value = e.target.value;
        this.setState({ [id]:value });
        
        //remove errors if field has changed
        let error = {...this.props.error}
        if(id === "url"){
            error.url = null;
        }

        if(id === "description"){
            error.description = null;
        }

        this.props.newPinError(error);
    }

    handleImageLoading(){
        this.setState({ imageLoading: true, imageLoadingError: false });
    }

    handleImageLoadingError(){
        this.setState({ imageLoadingError: true, imageLoading: false });
    }

    handleImageLoadingSuccess(){
        this.setState({ imageLoading: false, imageLoadingError: false });
    }

    submitHandler() {
        let error = {};

        if(this.state.description === "" || this.state.description.replace(/\s/g, "") === "")
            error.description = "Please enter valid description";

        if(this.state.url === "" || this.state.url.replace(/\s/g, "") === "")
            error.url = "Please enter valid image url";

        if(this.state.imageLoadingError || this.state.imageLaoding){
            return this.props.newSnackbarMessage("Failed to load image, please try again");
        }

        if(error.description || error.url){
            return this.props.newPinError(error);
        }

        const { url, description } = this.state;
        return this.props.newPin({ url, description });
    }

    componentWillUnmount() {
        //reset error/messages if there are any
        this.props.newPinError(false);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.description !== nextState.description
        || this.state.url !== nextState.url
        || this.props.loading !== nextProps.loading
        || this.state.imageLoading !== nextState.imageLoading
        || this.state.imageLoadingError !== nextState.imageLoadingError
        || this.state.imageLoadingSuccess !== nextState.imageLoadingSuccess
        || this.props.error !== nextProps.error)
            return true;
        return false;
    }

    render(){
        const loading = this.props.loading || this.state.imageLoading;
        let urlError         = (this.props.error)?this.props.error.url:"";
        let descriptionError = (this.props.error)?this.props.error.description:"";
        return (
            <div>
                <div className="container my-auto">
                    <div className="row">
                        <div className="[ col-lg-4 col-lg-offset-4 ] [ col-md-6 col-md-offset-3 ] [ col-sm-8 col-sm-offset-2 ] [ col-xs-12 ]">
                            <Card fill>
                                <Card.Header>
                                    <Card.Header.TextContainer>
                                        <Card.Header.Title className="headline"> New Pin </Card.Header.Title>
                                </Card.Header.TextContainer>
                                </Card.Header>
                                <Card.Media>
                                    <ImageWrapper src={this.state.url}
                                        onImageError={this.handleImageLoadingError}
                                        onImageLoaded={this.handleImageLoadingSuccess}
                                        onImageLoading={this.handleImageLoading}
                                    />
                                </Card.Media>
                                <Card.Text className="py-5">
                                    <Input
                                        id="url"
                                        fill
                                        label="Image url"
                                        error={urlError}
                                        placeholder="Image url"
                                        onChange={this.handleInputChange}
                                        value={this.state.url}
                                    />

                                    <Input
                                        fill
                                        id="description"
                                        label="Description"
                                        error={descriptionError}
                                        placeholder="Description"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </Card.Text>
                                <Card.Action>
                                    <Button disabled={loading} className="m-0" flat onClick={this.submitHandler}>
                                        {loading?"Loading...":(<span><i className="fa fa-plus mr-2"></i> Save </span>)}
                                    </Button>
                                </Card.Action>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        loading: state.pin.newPinPending,
        error: state.pin.newPinFailed
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ newPin, newPinError, newPinMessage, newSnackbarMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPin);