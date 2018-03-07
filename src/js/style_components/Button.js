import React from "react";

export default class Button extends React.Component {
    render(){
        let style = "btn ";
        const { dark, flat, disabled } = this.props;

        if(flat)
            style += "btn--flat ";

        if(dark)
            style += "btn--dark ";

        return(
            <button type="button" disabled={disabled} className={style}>{this.props.children}</button>
        );
    }
}

export { Button };