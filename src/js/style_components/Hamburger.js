import React from "react";
import PropTypes from "prop-types";

class Hamburger extends React.Component {

    render(){
        let className = "hamburger ";
        if(this.props.className)
            className += this.props.className;

        return (
            <div className={className}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }
}

Hamburger.propTypes = {
    className: PropTypes.string
}

export { Hamburger };