import React from "react";
import Portal from "preact-portal";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
    render() {
        const { open, close } = this.props;
        if(!open)
            return null;
        
        const Close = () => {
            if (!close) return null;
            return (
                <span className="modal__close" onClick={close}></span>
            );
        }
        
        return (
            <Portal into="#modal-root">
                <div className="modal">
                    <Close />
                    {this.props.children}
                </div>
                
            </Portal>
        );
    }
}

Modal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export { Modal };