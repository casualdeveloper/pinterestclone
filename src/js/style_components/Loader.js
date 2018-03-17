import React from "react";
import PropTypes from "prop-types";

export default class Loader extends React.Component {
    render(){
        let style = "";
        let className = "loader__circle__path ";

        if(this.props.disabled) {
            style += "display: none;";
        }

        if(this.props.size) {
            style += "width: " + this.props.size + ";";
        }

        if(this.props.light) {
            className += "light"
        }

        return (
            <div className="loader" style={style} >
                <svg className="loader__circle" viewBox="25 25 50 50">
                    <circle className={className} cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>
                </svg>
            </div>
        );
    }
}

Loader.propTypes = {
    disabled: PropTypes.bool,
    size: PropTypes.string,
    light: PropTypes.bool
}

export { Loader };