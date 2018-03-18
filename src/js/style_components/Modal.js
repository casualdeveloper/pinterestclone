import React from "react";
import Portal from "preact-portal";
import PropTypes from "prop-types";

const bodyDOM = document.body;

export default class Modal extends React.Component {
    render() {
        const { open, close } = this.props;
        if(!open){
            //remove modal open to allow scrolling again
            bodyDOM.className = bodyDOM.className.replace(/\bmodal-open\b/g, "");
            return null;
        }
        //attach modal open to body to remove scrollbar
        if(bodyDOM.className.indexOf("modal-open") === -1)
            bodyDOM.className += "modal-open";
            
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