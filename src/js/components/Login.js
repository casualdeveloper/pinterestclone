import React from "react";
import { PageHeader, Grid, Col, Button, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin } from "../actions";
import Message from "./Message";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler() {
        const { userLogin } = this.props;
        userLogin(this.state);
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
                            <Message.Error active={this.props.error} title="Failed to login" content={this.props.error} />
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="glyphicon glyphicon-user"></i></InputGroup.Addon>
                                        <FormControl id="username" placeholder="Username" type="text" onChange={this.handleInputChange} value={this.state.username} />
                                    </InputGroup>                                
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="glyphicon glyphicon-lock"></i></InputGroup.Addon>
                                        <FormControl id="password" placeholder="Password" type="password" onChange={this.handleInputChange} value={this.state.password} />
                                    </InputGroup>                                
                                </FormGroup>
                                <Button onClick={this.loginHandler} disabled={loading}>{loading?"Loading...":"Login"}</Button>
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
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);