import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userSignup, userSignupError, userSignupPending } from "../actions";
import { usernameInputCheck, passowrdInputCheck, emailInputCheck } from "../utils/inputCheck";
import { Button, Input, Loader, Card } from "../style_components";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
    }

    signupHandler() {
        const { userSignupError, userSignupPending, userSignup } = this.props;
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;

        userSignupPending(true);

        let    emailError = emailInputCheck(email);
        let usernameError = usernameInputCheck(username);
        let passwordError = passowrdInputCheck(password);
        
        if(usernameError !== "" || passwordError !== "" || emailError !== ""){
            userSignupPending(false);
            userSignupError({username: usernameError, password: passwordError, email: emailError});
            return;
        }
    
        return userSignup(this.state);
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

        if(id === "email"){
            error.email = null;
        }

        this.props.userSignupError(error);
    }

    render() {
        const { loading } = this.props;
        const    emailError = (this.props.error)?this.props.error.email   : null;
        const usernameError = (this.props.error)?this.props.error.username: null;
        const passwordError = (this.props.error)?this.props.error.password: null;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="[ col-lg-4 col-lg-offset-4 ] [ col-md-6 col-md-offset-3 ] [ col-sm-8 col-sm-offset-2 ] [ col-xs-12 ]">
                            <Card className="p-6" fill>
                                <Card.Title className="pb-5">
                                    <span className="headline">Sign up</span>
                                </Card.Title>
                                <form>
                                    <Card.Text className="py-5">
                                        <Input
                                            id="email"
                                            fill
                                            label="Email"
                                            autocomplete="email"
                                            error={emailError}
                                            placeholder="Youremail@mail.com"
                                            onChange={this.handleInputChange}
                                            value={this.state.email}
                                            helper="Your email address will not be shared with any third party"
                                        />

                                        <Input
                                            id="username"
                                            fill
                                            label="Username"
                                            autocomplete="username"
                                            helper="Username can contain letters, numbers and must be in range 6 &ndash; 32"
                                            error={usernameError}
                                            placeholder="Username123"
                                            onChange={this.handleInputChange}
                                            value={this.state.username}
                                        />

                                        <Input
                                            type="password"
                                            fill
                                            id="password"
                                            autocomplete="new-password"
                                            label="Password"
                                            helper="Password can contain letters, numbers, special characters and must be in range 8 &ndash; 32"
                                            error={passwordError}
                                            placeholder="Password123!@#$%^&*()"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                    </Card.Text>
                                    <Card.Action>
                                        <Button className="m-0" onClick={this.signupHandler} disabled={loading}>{loading?"Loading...":"Sign up"}</Button>
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
        loading: state.user.signupPending,
        error: state.user.signupError
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ userSignup, userSignupError, userSignupPending }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);