import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin, twitterLogin, userLoginPending, userLoginError } from "../actions";
import { usernameInputCheck, passowrdInputCheck } from "../utils/inputCheck";
import { Button, Input, Loader, Card } from "../style_components";

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

        let usernameError = usernameInputCheck(username);
        let passwordError = passowrdInputCheck(password);
        usernameError = (usernameError)?"Invalid username":"";
        passwordError = (passwordError)?"Invalid password":"";
        
        if(usernameError !== "" || passwordError !== ""){
            userLoginPending(false);
            userLoginError({username: usernameError, password: passwordError});
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
        
        
        //remove errors if field has changed
        let error = {...this.props.error}
        if(id === "username"){
            error.username = null;
        }

        if(id === "password"){
            error.password = null;
        }

        this.props.userLoginError(error);

    }

    render(){
        const { loading } = this.props;
        const usernameError = (this.props.error)?this.props.error.username: null;
        const passwordError = (this.props.error)?this.props.error.password: null;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="[ col-lg-4 col-lg-offset-4 ] [ col-md-6 col-md-offset-3 ] [ col-sm-8 col-sm-offset-2 ] [ col-xs-12 ]">
                            <Card className="p-6" fill>
                                <Card.Title className="pb-5">
                                    <span className="headline">Sign in</span>
                                </Card.Title>
                                <form>
                                    <Card.Text className="py-5">
                                        <Input
                                            id="username"
                                            fill
                                            label="Username"
                                            autocomplete="username"
                                            error={usernameError}
                                            placeholder="Username123"
                                            onChange={this.handleInputChange}
                                            value={this.state.username}
                                        />

                                        <Input
                                            type="password"
                                            fill
                                            id="password"
                                            autocomplete="current-password"
                                            label="Password"
                                            error={passwordError}
                                            placeholder="Password123!@#$%^&*()"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                    </Card.Text>
                                    <Card.Action>
                                        <Button className="m-0 mr-3" onClick={this.loginHandler} disabled={loading}>{loading?"Loading...":"Login"}</Button>
                                        <Button className="m-0" onClick={this.twitterLoginHandler} disabled={loading}>
                                            <i className="fa fa-twitter mr-3" aria-hidden="true"></i>
                                            {loading?"Loading...":"Twitter"}
                                        </Button>
                                    </Card.Action>
                                </form>
                                <Loader disabled={!loading} block blockLight />
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
        user: state.user,
        loading: state.user.loginPending,
        error: state.user.loginError
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ userLogin, twitterLogin, userLoginPending, userLoginError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);