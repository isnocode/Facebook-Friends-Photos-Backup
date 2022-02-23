import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
class ListImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }
    render() {

        return (
            <Col md={12}>
                <h5 className="fname">
                    <a href={"https://facebook.com/" + this.props.uid}>{this.props.name}</a>
                </h5>
                <div className="photos">{this.props.photo}</div>
            </Col>
        );
    }
}

export default ListImages;