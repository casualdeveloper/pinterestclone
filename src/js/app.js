import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./router";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import ReduxThunk  from "redux-thunk";
import reducers from "./reducers";
import "../styles/main.scss";


const store = createStore(reducers,applyMiddleware(ReduxThunk));


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>, document.getElementById("root"));