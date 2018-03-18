import React from "react";
import PropTypes from "prop-types";
import { Loader } from "./Loader";
import { Hamburger } from "./Hamburger";
import { Modal } from "./Modal";

class NavBar extends React.Component {
    render(){
        let className = "nav-bar ";

        if(this.props.fixed)
            className += "nav-bar--fixed ";
        else if(this.props.fixedMobile)
            className += "nav-bar--fixed-mobile ";

        return (
            <span>
                <div className={className}>
                    {this.props.children}
                </div>
                <div className="nav-bar-placeholder" />
            </span>
        );
    }
}

NavBar.propTypes = {
    fixed: PropTypes.bool,
    fixedMobile: PropTypes.bool
}

NavBar.NavBrand = (props) => {
    return (
        <div className="title">{props.children}</div>
    );
}

NavBar.Loader = (props) => {
    return (
        <div className="my-auto ml-auto">
            <Loader light size="28px" disabled={props.disabled} />
        </div>
    );
}

NavBar.Loader.propTypes = {
    disabled: PropTypes.bool
}

class Nav extends React.Component {
    render(){
        const { pullRight } = this.props;
        let style = "";

        if(pullRight)
            style += "margin-left: auto;";
        
        return (
            <nav className="nav" style={style}>
                <NavResponsive {...this.props} >
                    {this.props.children}
                </NavResponsive>
            </nav>
        );
    }
}

Nav.propTypes = {
    pullRight: PropTypes.bool,
    responsive: PropTypes.bool
}

class NavResponsive extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        /**
         * Create a new set of children with modified onClick
         * To a new onClick function we attach Modal close function
         * and previous onClick function if child component had one. 
         */
        if(!props.responsive) return;

        this.cildrenWithModifiedOnClick = React.Children.map(this.props.children, (child) => {
            //if there is onClick already attached make copy of it and attach to a new function
            let onClickCopy = () => {};
            if(child.attributes.onClick)
                onClickCopy = child.attributes.onClick;
            
            //attach new onClick to a child
            child.attributes.onClick = () => { this.closeModal(); onClickCopy() };
            return child;
        });
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render(){
        if(this.props.responsive){
            return (
                <ul className="responsive">
                    {this.props.children}
                    <NavItem onClick={this.openModal}><Hamburger className="mr-4" /></NavItem>
                    <Modal open={this.state.isModalOpen} close={this.closeModal}>
                        <ul className="nav-modal text-center m-auto">
                            {this.cildrenWithModifiedOnClick}
                        </ul>
                    </Modal>
                </ul>
            );
        }
        return (
            <ul>
                {this.props.children}
            </ul>
        );
    }
}

class NavItem extends React.Component {
    render(){
        let className = "";
        const { active } = this.props;

        if(active)
            className += "current ";

        return (
            <li onClick={this.props.onClick} className={className}>{this.props.children}</li>
        );
    }
}

NavItem.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func
}



export default NavBar;
export { NavBar, Nav, NavItem };