import React from "react";

export default class Button extends React.Component {
    render(){
        return(
            <button type="button" className="[ btn dark ]">{this.props.children}</button>
        );
    }
}

export { Button };