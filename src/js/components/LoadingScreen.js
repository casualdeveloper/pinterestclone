import React from "react";
import Loader from "./Loader";

class LoadingScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let style = {};
        if(this.props.disabled)
            style={display: "none"};
        return(
            <div className="loading_screen text-center" style={style}>
                <Loader />
            </div>
        );
    }
}

export default LoadingScreen;