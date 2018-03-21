import React from "react";
import UserPins from "./UserPins";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MyPins extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <UserPins {...this.props} userId={this.props.userId} />
        );
    }
}


function mapStateToProps(state){
    return {
        userId: state.user.id
    };
}

export default connect(mapStateToProps)(MyPins);