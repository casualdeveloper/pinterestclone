import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { Snackbar } from "../style_components";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteSnackbarMessage } from "../actions";

const EnterAnimationTime = 200;
const LeaveAnimationTime = 200;
const OnScreenTime = 3000;

/**
 * Snackbar takes array of messages as props
 * Snackbar has 3 values in state: 
 * 1. - item = item/message that will be displayed in snackbar
 * 2. - minTimePassed = bool value that tells if minimum amount of time passed before
 *    - possible deletion of item message (in case we want to remove snackbar ASAP)
 * 3. - removeItemOnMinTimePassed = bool value that will determine if snackbar should be removed ASAP
 * 
 * Taking first one(0) item from array and assign it to state.item
 * In render we check if we have valid state.item and if so
 * Snackbar Component is mounted to DOM.
 * 
 * When Snackbar Component is mounted we start these events:
 * 1. - CSSTransitionGroup starts animating entrance of snackbar
 * 2. - We start timer how long snackbar will be on screen (default 3000)
 * 3. - We start timer how long it will take to finish animating snackbar into its position
 * 
 * In OnMount we check if there is more items in the stack
 * and if so we call function to remove current snackbar ASAP
 * so the next item in stack could be shown.
 * 
 * In removeItem:
 * 1. - We set item to null to start component umounting
 *      so that CSSTransitionGroup could start animating component leaving
 * 2. - We reset rest of the state to default values
 * 
 * In OnUnmount:
 * 1. - We clear up all timers
 * 2. - and call redux action to remove message from the stack.
 *      After redux removes message component get updated array as prop
 *      and once again we set item to the first item in a stack.
 */

class SnackbarWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.itemStack[0],
            minTimePassed: false,
            removeItemOnMinTimePassed: false
        }

        this.removeItem = this.removeItem.bind(this);
        this.removeItemOnlyAfterEnterAnimation = this.removeItemOnlyAfterEnterAnimation.bind(this);

        this.onMount = this.onMount.bind(this);
        this.onUnmount = this.onUnmount.bind(this);

        this.setRemoveItemTimer = this.setRemoveItemTimer.bind(this);
        this.setMinTimePassedTimer = this.setMinTimePassedTimer.bind(this);

        this.clearTimers = this.clearTimers.bind(this);
        
    }

    clearTimers() {
        clearTimeout(this.removeItemTimer);
        clearTimeout(this.minTimePassedTimer);
    }

    setRemoveItemTimer(t = OnScreenTime) {
        this.removeItemTimer = setTimeout(() => {
            this.removeItem();
        }, t);
    }

    //we add extra 500 so in case we a removing item ASAP
    //user at least gets extra time to see what message/item was about
    setMinTimePassedTimer(t = (EnterAnimationTime + 500)) {
        this.minTimePassedTimer = setTimeout(() => {
            this.setState({ minTimePassed: true });
            
            //check if we should remove snackbar ASAP and if so remove it
            if(this.state.removeItemOnMinTimePassed){
                this.removeItem();
            }
        }, t);
    }

    onMount() {
        /**
         * Once snackbar mounts do following:
         * [1] Start timers
         * [2] check if there are any other messages besides current one
         *     and if so immediately call function for removal of current message
         *     as soon as it appears
         */

        //[1]
        this.setRemoveItemTimer(); 
        this.setMinTimePassedTimer(); 

        //[2] 
        if(this.props.itemStackLength > 1) { 
            this.removeItemOnlyAfterEnterAnimation();
        }
    }

    onUnmount() {
        /**
         * Once snackbar unmounts do following:
         * [1] Clear both timers 
         * [2] Call redux action to delete current message and update message list
         */
        this.clearTimers();//[1]
        this.props.deleteSnackbarMessage();//[2]
    }

    removeItem() {
        //set item to null to unmount snackbar, reset rest of the state
        this.setState({ item: null, minTimePassed: false, removeItemOnMinTimePassed: false });
    }
    
    removeItemOnlyAfterEnterAnimation() {
        /**
         * [1] if min time already passed remove item immediately
         * [2] if not set removeItemOnMinTimePassed to true
         *     so once min time passes function removeItem would be called
         */
        if(this.state.minTimePassed) //[1]
            return this.removeItem();
        
        this.setState({ removeItemOnMinTimePassed: true });//[2]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ item: nextProps.itemStack[0]});
        //remove currently shown snackbar if new ones have been pushed to the stack
        if(this.props.itemStackLength < nextProps.itemStackLength)
            this.removeItemOnlyAfterEnterAnimation();
    }

    render() {
        let item = this.state.item;
        let RenderItem = (
            (item)
            ?<Snackbar onClick={this.removeItemOnlyAfterEnterAnimation} onUnmount={this.onUnmount} onMount={this.onMount}>{item}</Snackbar>
            :null
        );
        
        return (
            <CSSTransitionGroup
                transitionName="snackbar"
                transitionAppear={true}
                transitionAppearTimeout={EnterAnimationTime}
                transitionEnter={true}
                transitionEnterTimeout={EnterAnimationTime}
                transitionLeave={true}
                transitionLeaveTimeout={LeaveAnimationTime}>
                {RenderItem}
            </CSSTransitionGroup>
        );
    }
}

Snackbar.propTypes = {
    itemStack: PropTypes.array,
    itemStackLength: PropTypes.number,
    deleteSnackbarMessage: PropTypes.func
}

Snackbar.defaultProps = {
    itemStack: [],
    itemStackLength: 0,
    deleteSnackbarMessage: () => {}
}


function mapStateToProps(state){
    return {
        itemStack: state.snackbar.messageStack,
        itemStackLength: state.snackbar.messageStack.length
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ deleteSnackbarMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarWrapper);
