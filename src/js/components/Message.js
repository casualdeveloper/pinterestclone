import React from "react";
import { Alert } from "react-bootstrap";

export default class Message extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            active: !!props.active,
            title: props.title || null,
            content: props.children || props.content || null,
            type: this.setProperType(props.type)
        };

        if(typeof(this.state.active) === typeof(undefined))
            this.state.active = true;

        
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.active || null,
            title: nextProps.title || null,
            content:nextProps.children || nextProps.content || null,
            type: this.setProperType(nextProps.type)
        });
    }

    setProperType(type){
        const types = ["danger", "warning", "info", "success"];
        if(!type || types.indexOf(type) === -1)
            type = "info";
        return type;
    }

    handleAlertDismiss() {
        this.setState({active: false});
    }

    render(){
        if(this.state.active){
            return (
                <Alert bsStyle={this.state.type} onDismiss={this.handleAlertDismiss}>
                    <h4>{this.state.title}</h4>
                    <p>{this.state.content}</p>
                </Alert>
            );
        }
        return null;
    }
    
}

Message.Error = class MessageError extends React.Component {
    render(){
        return(
            <Message 
                active={this.props.active}
                type="danger"
                title={this.props.title || "Error"}
                content={this.props.children || this.props.content || "Oops! something went wrong, please try again later."}
                />
        );
    }
};

Message.Danger = Message.Error;

Message.Warning = class MessageWarning extends React.Component {
    render(){
        return(
            <Message 
                active={this.props.active}
                type="warning"
                title={this.props.title || "Warning"}
                content={this.props.children || this.props.content || null}
                />
        );
    } 
};

Message.Info = class MessageInfo extends React.Component {
    render(){
        return(
            <Message 
                active={this.props.active}
                type="info"
                title={this.props.title || "Info"}
                content={this.props.children || this.props.content || null}
                />
        );
    } 
};

Message.Success = class MessageSuccess extends React.Component {
    render(){
        return(
            <Message 
                active={this.props.active}
                type="success"
                title={this.props.title || "Success"}
                content={this.props.children || this.props.content || null}
                />
        );
    } 
};