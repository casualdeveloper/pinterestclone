import React from "react";
import { PageHeader, Grid, Col, Button, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import ImageWrapper from "./Image";
import Message from "./Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newPin, newPinError, newPinMessage } from "../actions/pinActions";

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
        this.props.newPinError(false);
        this.props.newPinMessage(false);

        if(this.state.description === "" || this.state.description.replace(/\s/g, "") === "")
            return this.props.newPinError("Please enter valid description.");

        if(this.state.url === "" || this.state.url.replace(/\s/g, "") === "")
            return this.props.newPinError("Please enter valid image url.");

        if(this.state.imageLoadingError)
            return this.props.newPinError("Sorry, image failed to load.");

        const { url, description } = this.state;
        return this.props.newPin({ url, description });
    }

    componentWillUnmount() {
        //reset error/messages if there are any
        this.props.newPinError(false);
        this.props.newPinMessage(false);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.description !== nextState.description
        || this.state.url !== nextState.url
        || this.props.loading !== nextProps.loading
        || this.state.imageLoading !== nextState.imageLoading
        || this.state.imageLoadingError !== nextState.imageLoadingError
        || this.state.imageLoadingSuccess !== nextState.imageLoadingSuccess
        || this.props.error !== nextProps.error
        || this.props.successMessage !== nextProps.successMessage)
            return true;
        return false;
    }

    render(){
        const loading = this.props.loading || this.state.imageLoading;
        return (
            <div>
                <PageHeader classname="text-center">
                    <h1 className="text-center">New Pin</h1>
                </PageHeader>
                <div className="container">
                    <Grid>
                        <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
                            <Message.Error active={this.props.error} title="Failed to create new pin" content={this.props.error} />
                            <Message.Success active={this.props.successMessage} title="New pin" content={this.props.successMessage} />
                            <ImageWrapper id="newPicImage" src={this.state.url}
                                onImageError={this.handleImageLoadingError}
                                onImageLoaded={this.handleImageLoadingSuccess}
                                onImageLoading={this.handleImageLoading}
                            >
                            </ImageWrapper>
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-link"></i></InputGroup.Addon>
                                        <FormControl id="url" placeholder="Image url" type="text" onChange={this.handleInputChange} value={this.state.url}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-file-text-o"></i></InputGroup.Addon>
                                        <FormControl id="description" placeholder="Description" type="text" onChange={this.handleInputChange} value={this.state.description}/>
                                    </InputGroup>
                                </FormGroup>
                                <Button bsStyle="success" onClick={this.submitHandler} disabled={loading}>{loading?"Loading...":(<span><i className="fa fa-plus"></i> Save </span>)}</Button>
                            </form>
                        </Col>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        loading: state.pin.newPinPending,
        error: state.pin.newPinFailed,
        successMessage: state.pin.newPinSuccessMessage
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ newPin, newPinError, newPinMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPin);