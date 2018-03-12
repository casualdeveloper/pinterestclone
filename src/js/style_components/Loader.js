import React from "react";
import PropTypes from "prop-types";

export default class Loader extends React.Component {
    render(){
        let style = "";

        if(this.props.disabled){
            style += "display: none;";
        }

        return (
            <div className="loader" style={style} >
                <svg class="loader__circle" viewBox="25 25 50 50">
                    <circle class="loader__circle__path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>
                </svg>
            </div>
        );
    }
}

Loader.propTypes = {
    disabled: PropTypes.bool
}

export { Loader };