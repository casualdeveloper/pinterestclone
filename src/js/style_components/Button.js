import React from "react";

export default class Button extends React.Component {
    render(){
        let style = "btn ";
        const { dark, flat, disabled, onClick } = this.props;

        if(flat)
            style += "btn--flat ";

        if(dark)
            style += "btn--dark ";

        return(
            <button onClick={onClick} type="button" disabled={disabled} className={style}>{this.props.children}</button>
        );
    }
}

export { Button };