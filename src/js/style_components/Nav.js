import React from "react";
import PropTypes from "prop-types";

class NavBar extends React.Component {
    render(){
        return (
            <div className="nav-bar">
                {this.props.children}
            </div>
        );
    }
}


class Nav extends React.Component {
    render(){
        const { pullRight } = this.props;
        let style = "";
        if(pullRight)
            style += "margin-left: auto;";
        return (
            <nav className="nav" style={style}>
                <ul>
                    {this.props.children}
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {
    pullRight: PropTypes.bool
}

class NavItem extends React.Component {
    render(){
        let className = "";
        const { active } = this.props;

        if(active)
            className += "current ";

        return (
            <li className={className}>{this.props.children}</li>
        );
    }
}

NavItem.propTypes = {
    active: PropTypes.bool
}

class NavBrand extends React.Component {
    render(){
        return (
            <div className="title">{this.props.children}</div>
        );
    }
}

export default NavBar;
export { NavBar, Nav, NavItem, NavBrand };