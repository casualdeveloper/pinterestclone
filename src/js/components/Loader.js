import React from "react";

class Loader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let style = {};
        if(this.props.disabled)
            style={display: "none"};
        return(
            <div className="loader" style={style}>
                <i className="fa fa-cog fa-spin fa-3x fa-fw" aria-hidden="true"></i>
            </div>
        );
    }
}

export default Loader;