import React from "react";
import Portal from "preact-portal";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";

const bodyDOM = document.body;

const EnterAnimationTime = 200;
const LeaveAnimationTime = 200;


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

        const RenderItem = (
            (!open)
            ?null
            :<div className="modal">
                <Close />
                {this.props.children}
            </div>
        )

        return (
            <Portal into="#modal-root">
                <CSSTransitionGroup component={FirstChild}
                    transitionName="modal-fade"
                    transitionAppear={false}
                    transitionEnter={true}
                    transitionEnterTimeout={EnterAnimationTime}
                    transitionLeave={true}
                    transitionLeaveTimeout={LeaveAnimationTime}>
                    {RenderItem}
                </CSSTransitionGroup>
            </Portal>
        );
    }
}

const FirstChild = (props) => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

Modal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export { Modal };