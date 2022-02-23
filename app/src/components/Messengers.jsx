import React, { Component } from 'react';
import axios from 'axios';
import Files from "react-files";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import ListSenders from './ListSenders';
class Messengers extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileReader = new FileReader();
        this.fileReader.onload = event => {
            var obj = JSON.parse(event.target.result);
            this.setState({ messengers: obj });
        };
        this.state = {
            token: '',
            messengers: [],
            uriData: '',
            isLoading: false
        }
    }

    getMessengers() {
        if (this.state.token) {
            axios.get(`https://graph.facebook.com/me/threads?fields=senders,updated_time,name&limit=1000&access_token=${this.state.token}`)
                .then(res => {
                    var uriData = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data.data));
                    this.setState({ uriData: uriData, messengers: res.data.data });
                })
                .then(res => {
                    this.setState({ isLoading: false });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            alert('Access token is empty!!!')
        }
    }

    handleChange(event) {
        this.setState({ token: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ isLoading: true });
        this.getMessengers();
        event.preventDefault();
    }

    render() {
        console.log(this.state.messengers)
        return (
            <Container className="my-3">
                {this.state.isLoading ? <div className="modal"></div> : null}
                <Row>
                    <Col md={12}>
                        <h3>Get Recent Messengers</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Access Token</Form.Label>
                                <Form.Control type="text" placeholder="EAAA....." value={this.state.token} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" className="mr-2" type="submit">
                                    Get Messengers
                                </Button>
                                {this.state.uriData ? <Button href={this.state.uriData} id="link" variant="primary" download="export.json">Export Json</Button> : null}
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="files">
                        <Files
                            className="files-dropzone"
                            onChange={file => { this.fileReader.readAsText(file[0]); }}
                            onError={err => console.log(err)}
                            accepts={[".json"]}
                            clickable
                        >
                            Drop files here or click to upload Json File
                        </Files>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messengers.map((item, key) => {
                                    var senderName;
                                    if (item.senders.data.length === 2) {
                                        senderName = item.senders.data[0].name;
                                    } else {
                                        senderName = item.name;
                                    }
                                    return <ListSenders key={key} senderName={senderName} messengerTime={item.updated_time} />
                                })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Messengers;