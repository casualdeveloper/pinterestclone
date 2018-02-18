import React from "react";
import { PageHeader, Grid, Col, Button, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userSignup, userSignupError, userSignupPending } from "../actions";
import Message from "./Message";
import { usernameInputCheck, passowrdInputCheck, emailInputCheck } from "../utils/inputCheck";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
    }

    signupHandler() {
        const { userSignupError, userSignupPending, userSignup } = this.props;
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;

        userSignupPending(true);
        let errorString = "";

        errorString+=emailInputCheck(email);
        errorString+=usernameInputCheck(username);
        errorString+=passowrdInputCheck(password);
        
        if(errorString !== ""){
            userSignupPending(false);
            userSignupError(errorString);
            return;
        }
    
        return userSignup(this.state);
    }

    handleInputChange(e) {
        //id is used to identify input eg.:"e.target.id": "password" <- identifies that changed input field is password
        let id = e.target.id;
        let value = e.target.value;
        this.setState({ [id]:value });
    }

    render() {
        const { loading } = this.props;
        return (
            <div>
                <PageHeader classname="text-center">
                    <h1 className="text-center">Sign Up</h1>
                </PageHeader>
                <div className="container">
                    <Grid>
                        <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
                            <Message.Error active={this.props.error} title="Failed to signup" content={this.props.error} />
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-envelope"></i></InputGroup.Addon>
                                        <FormControl id="email" placeholder="Email address" type="email" onChange={this.handleInputChange} value={this.state.email}/>
                                    </InputGroup>                                
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-user"></i></InputGroup.Addon>
                                        <FormControl id="username" placeholder="Username" type="text" onChange={this.handleInputChange} value={this.state.username}/>
                                    </InputGroup>                                
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-lock"></i></InputGroup.Addon>
                                        <FormControl id="password" placeholder="Password" type="password" onChange={this.handleInputChange} value={this.state.password}/>
                                    </InputGroup>                                
                                </FormGroup>
                                <Button onClick={this.signupHandler} disabled={loading}>{loading?"Loading...":"Signup"}</Button>
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
        loading: state.user.signupPending,
        error: state.user.signupError
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ userSignup, userSignupError, userSignupPending }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);