import React from "react";
import PropTypes from "prop-types";

export default class Snackbar extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render(){
        return (
            <div onClick={this.props.onClick} className="snackbar">{this.props.children}</div>
        );
    }
}

Snackbar.propTypes = {
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    onClick: PropTypes.func
}

Snackbar.defaultProps = {
    onMount: () => {},
    onUnmount: () => {},
    onClick: () => {}
}

export { Snackbar };