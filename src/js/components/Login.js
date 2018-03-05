import React from "react";
import { PageHeader, Grid, Col, Button, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin, twitterLogin, userLoginPending, userLoginError } from "../actions";
import Message from "./Message";
import { usernameInputCheck, passowrdInputCheck } from "../utils/inputCheck";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.twitterLoginHandler = this.twitterLoginHandler.bind(this);
    }

    loginHandler() {
        const { userLoginPending, userLoginError, userLogin } = this.props;
        let username = this.state.username;
        let password = this.state.password;

        userLoginPending(true);
        let errorString = "";

        errorString+=usernameInputCheck(username);
        errorString+=passowrdInputCheck(password);
        
        if(errorString !== ""){
            userLoginPending(false);
            userLoginError(errorString);
            return;
        }
    
        return userLogin(this.state);
    }

    twitterLoginHandler() {
        const { twitterLogin } = this.props;
        //we have to open new window in button click callback to avoid popup block from browsers
        let newWindow = window.open("", "_blank", "height: 600, width: 600");
        twitterLogin(newWindow);
    }

    handleInputChange(e) {
        //id is used to identify input eg.:"e.target.id": "password" <- identifies that changed input field is password
        let id = e.target.id;
        let value = e.target.value;
        this.setState({ [id]:value });
    }

    render(){
        const { loading } = this.props;
        return (
            <div>
                <PageHeader classname="text-center">
                    <h1 className="text-center">Sign in</h1>
                </PageHeader>
                <div className="container">
                    <Grid>
                        <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
                            <Message.Error active={this.props.error} title="Failed to login" >{this.props.error}</Message.Error>
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-user"></i></InputGroup.Addon>
                                        <FormControl id="username" placeholder="Username" type="text" onChange={this.handleInputChange} value={this.state.username} />
                                    </InputGroup>                                
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-lock"></i></InputGroup.Addon>
                                        <FormControl id="password" placeholder="Password" type="password" onChange={this.handleInputChange} value={this.state.password} />
                                    </InputGroup>                                
                                </FormGroup>
                                <Button onClick={this.loginHandler} disabled={loading}>{loading?"Loading...":"Login"}</Button>
                                <Button onClick={this.twitterLoginHandler} disabled={loading}>{loading?"Loading...":"Twitter"}</Button>
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
        user: state.user,
        loading: state.user.loginPending,
        error: state.user.loginError
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ userLogin, twitterLogin, userLoginPending, userLoginError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);