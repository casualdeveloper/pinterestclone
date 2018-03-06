import React from "react";

export default class Button extends React.Component {
    render(){
        let style = "btn ";
        const { dark, disabled } = this.props;

        if(dark)
            style += "btn--dark ";

        return(
            <button type="button" disabled={disabled} className={style}>{this.props.children}</button>
        );
    }
}

export { Button };