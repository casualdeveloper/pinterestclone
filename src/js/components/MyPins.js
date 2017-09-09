import React from "react";
import { PageHeader, Grid, Col, Button, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import Loader from "./Loader";

class MyPins extends React.Component {
    render(){
        return (
            <div className="container">
                <Loader />
            </div>
        );
    }
}

export default MyPins;