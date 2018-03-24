import React from "react";
import Portal from "preact-portal";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const bodyDOM = document.body;

const EnterAnimationTime = 150;
const LeaveAnimationTime = 150;


export default class Modal extends React.Component {
    render() {
        const { open, close } = this.props;
        if(!open){
            //remove modal open to allow scrolling again
            bodyDOM.className = bodyDOM.className.replace(/\bmodal-open\b/g, "");
        }
        //attach modal open to body to remove scrollbar
        if(open && bodyDOM.className.indexOf("modal-open") === -1)
            bodyDOM.className += "modal-open";
            
        const Close = () => {
            if (!close) return null;
            return (
                <span className="modal__close" onClick={close}></span>
            );
        }

        return (
            <Portal into="#modal-root">
                <CSSTransition
                classNames="modal-fade"
                appear={true}
                timeout={{ appear:EnterAnimationTime, enter: EnterAnimationTime, exit: LeaveAnimationTime }}
                mountOnEnter={true}
                unmountOnExit={true}
                in={this.props.open}>
                    <div className="modal">
                        <Close />
                        {this.props.children}
                    </div>
                </CSSTransition>
            </Portal>
        );
    }
}


Modal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export { Modal };