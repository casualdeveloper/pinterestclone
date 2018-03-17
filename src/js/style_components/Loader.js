import React from "react";
import PropTypes from "prop-types";

export default class Loader extends React.Component {
    render(){
        let style = "";
        let CircleClassName = "loader__circle__path ";

        let className = "loader ";
        className += this.props.className;

        if(this.props.disabled) {
            style += "display: none;";
        }

        if(this.props.size) {
            style += "width: " + this.props.size + ";";
        }

        if(this.props.light) {
            CircleClassName += "light "
        }

        return (
            <Block {...this.props}>
                <div className={className} style={style} >
                    <svg className="loader__circle" viewBox="25 25 50 50">
                        <circle className={CircleClassName} cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>
                    </svg>
                </div>
            </Block>
        );
    }
}

const Block = (props) => {
    let className = "loader-block "
    let style = "";

    if(props.disabled) {
        style += "display: none;";
    }
    
    if(props.blockLight)
        className += "light "
    
    if(props.block) {
        return (
            <div className={className} style={style} >
                {props.children}
            </div>
        )
    } else {
        return props.children;
    }
}

Loader.propTypes = {
    disabled: PropTypes.bool,
    size: PropTypes.string,
    light: PropTypes.bool,
    block: PropTypes.bool,
    blockLight: PropTypes.bool,
    className: PropTypes.string
}

Loader.defaultProps = {
    className: ""
}

export { Loader };