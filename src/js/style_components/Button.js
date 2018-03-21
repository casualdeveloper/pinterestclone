import React from "react";
import PropTypes from "prop-types";

export default class Button extends React.Component {
    render(){
        let style = "btn ";
        const { dark, flat, disabled, className, onClick } = this.props;
        
        if(flat)
            style += "btn--flat ";

        if(dark)
            style += "btn--dark ";

        style += className;

        return(
            <button onClick={onClick} type="button" disabled={disabled} className={style}>{this.props.children}</button>
        );
    }
}

Button.propTypes = {
         dark: PropTypes.bool,
         flat: PropTypes.bool,
      onClick: PropTypes.func,
     disabled: PropTypes.bool,
    className: PropTypes.string
}



Button.defaultProps = {
         dark: false,
        flast: false,
     disabled: false,
    className: ""
}


export { Button };