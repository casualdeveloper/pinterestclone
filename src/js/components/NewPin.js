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
            description: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleInputChange(e) {
        //id is used to identify input eg.:"e.target.id": "password" <- identifies that changed input field is password
        let id = e.target.id;
        let value = e.target.value;
        this.setState({ [id]:value });
    }

    submitHandler(e) {
        e.preventDefault();
        this.props.newPin({...this.state});
    }

    componentWillUnmount() {
        //reset error/messages if there are any
        this.props.newPinError(false);
        this.props.newPinMessage(false);
    }

    render(){
        const { loading } = this.props;
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
                            <ImageWrapper id="newPicImage" src={this.state.url}></ImageWrapper>
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
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ newPin, newPinError, newPinMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPin);