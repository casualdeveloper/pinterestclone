import React from "react";
import { Route, Switch, Link, withRouter, Redirect } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyPins from "./components/MyPins";
import NewPin from "./components/NewPin";
import UserPins from "./components/UserPins";
import Pinned from "./components/Pinned";

import { NavBar, Nav, NavItem, NavBrand, Loader } from "./style_components";
import SnackbarWrapper from "./components/Snackbar";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userJWTLogin, userLogout } from "./actions";



class App extends React.Component {
    constructor(props){
        super(props);
        if(this.props.JWT)
            this.props.userJWTLogin(this.props.JWT);
    }

    render(){
        let currentLocation = this.props.location.pathname;
        return(
            <div>
                <Menu {...this.props} isAuth={this.props.user.isAuth} userLogout={this.props.userLogout} currentLocation={currentLocation} />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/user/:userId" component={UserPins}/>
                    <PublicOnlyRoute exact path="/login" component={Login} {...this.props}/>
                    <PublicOnlyRoute exact path="/signup" component={Signup} {...this.props}/>
                    <PrivateRoute exact path="/pinned" component={Pinned} {...this.props} />
                    <PrivateRoute exact path="/mypins" component={MyPins} {...this.props}/>
                    <PrivateRoute exact path="/newpin" component={NewPin} {...this.props}/>
                    <Route component={NotFound} />
                </Switch>
                <Footbar />
                <SnackbarWrapper />
            </div>
        );
    }
}

const PublicOnlyRoute = ({component:Component, user, location, ...props}) => {
    if(user.isAuth){
        const redirectTo = (
            location.state 
            && location.state.from 
            && location.state.from.pathname
        )
        ?location.state.from.pathname
        :"/";

        return (
            <Route {...props} render={() => (
                <Redirect to={redirectTo} />
            )} />
        );
    }
    return (
        <Route {...props} render={(props) => (
            <Component {...props}/>
        )} /> 
    );
};

const PrivateRoute = ({component:Component, user, location, ...props}) => {
    if(user.isAuth){
        return ( 
            <Route {...props} render={(props) => (
                <Component {...props}/>
            )} /> 
        );
    }

    return (
        <Route {...props} render={() => (
            <Redirect to={{ pathname: "/login", state: { from: location }}} />
        )} />
    );
};

const Menu = (props) => {
    const { isAuth } = props;
    //show loading indicator only when user is NOT in login or signup page
    const loading = props.user.loginPending
    && ( props.currentLocation != "/login" && props.currentLocation != "/signup" );

    return (
        <NavBar fixedMobile >
            <NavBar.NavBrand><Link to="/" >Pinterest</Link></NavBar.NavBrand>
            <Loader block light size="28px" disabled={!loading} />
            {isAuth
                ?<PrivateNav {...props} />
                :<PublicNav {...props} />
            }
        </NavBar>
    );
};

const PublicNav = (props) => {
    const { currentLocation } = props;
    return (
        <Nav pullRight responsive>
            <NavItem active={currentLocation == "/login"}><Link to="/login">Sign in</Link></NavItem>
            <NavItem active={currentLocation == "/signup"}><Link to="/signup">sign up</Link></NavItem>
        </Nav>
    );
};

const PrivateNav = (props) => {
    const { userLogout, currentLocation } = props;
    return (
        <Nav pullRight responsive>
            <NavItem active={currentLocation == "/pinned"}><Link to="/pinned">Pinned</Link></NavItem>
            <NavItem active={currentLocation == "/mypins"}><Link to="/mypins">My pins</Link></NavItem>
            <NavItem active={currentLocation == "/newpin"}><Link to="/newpin">New pin</Link></NavItem>
            <NavItem><Link to="#" onClick={() => { userLogout(); }}>Logout</Link></NavItem>
        </Nav>
    );
};

const Footbar = () => {
    return (
        <div className="footbar text-center m-3">
            <a href="https://github.com/casualdeveloper/pinterestclone" target="_blank" className="footbar__text"><i className="fa fa-github mr-3" aria-hidden="true"></i>GitHub</a>
        </div>
    );
};

function mapStateToProps(state){
    return {
        user: state.user,
        JWT: state.user.JWT
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ userJWTLogin, userLogout } , dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));