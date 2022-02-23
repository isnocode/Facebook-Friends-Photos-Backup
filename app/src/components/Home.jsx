import React, { Component } from 'react';
import axios from 'axios';
import Files from "react-files";
import MultiSelect from "@kenshooui/react-multi-select";
import ListImages from './ListImages';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
class Home extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.state = {
            friends: [],
            selectedItems: [],
            imagesFriend: [],
            token: '',
            uriData: '',
            isLoading: false
        }
        this.fileReader = new FileReader();
        this.fileReader.onload = event => {
            JSON.parse(event.target.result).forEach(value => {
                return this.setState({
                    friends: [...this.state.friends, {
                        id: value.id,
                        label: value.name
                    }],
                });
            })
        };
    }

    getFriend() {
        if (this.state.token) {
            axios.get(`https://graph.facebook.com/me/friends?fields=id,name&limit=5000&access_token=${this.state.token}`)
                .then(res => {
                    var uriData = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data.data));
                    this.setState({ uriData: uriData });
                    res.data.data.forEach(value => {
                        this.setState({
                            friends: [...this.state.friends, {
                                id: value.id,
                                label: value.name
                            }],
                        });
                    })
                })
                .then(res => {
                    this.setState({ isLoading: false });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            alert('Invalid Token!!!')
        }
    }
    getImage = () => {
        if (this.state.selectedItems) {
            var ids = '';
            this.state.selectedItems.forEach(item => {
                ids += item.id + ','
            })
            var newStr = ids.substring(0, ids.length - 1);
            if (this.state.token) {
                axios.get(`https://graph.facebook.com/?ids=${newStr}&fields=name,photos.limit(10){id,images}&access_token=${this.state.token}`)
                    .then(res => {
                        this.setState({ imagesFriend: res.data });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                alert('Invalid Token!!!')
            }
        } else {
            alert('Select Friends!!!')
        }
    }
    handleChange(event) {
        this.setState({ token: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ isLoading: true });
        this.getFriend();
        event.preventDefault();
    }
    handleChangeSelect(selectedItems) {
        this.setState({ selectedItems });
    }

    render() {
        const obj = Object.entries(this.state.imagesFriend);
        console.log(this.state.friends);
        return (
            <Container className="my-3">
                {this.state.isLoading ? <div className="modal"></div> : null}
                <Row>
                    <Col md={12}>
                        <h3>Get Photos of Friends</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Access Token</Form.Label>
                                <Form.Control type="text" placeholder="EAAA....." value={this.state.token} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" className="mr-2" type="submit">
                                    Get The Friends List
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
                            Drop your .json file here or click to upload the .json file
                        </Files>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col md={12}>
                        <MultiSelect
                            items={this.state.friends}
                            selectedItems={this.state.selectedItems}
                            onChange={this.handleChangeSelect}
                        />
                        <div className="mt-3">
                            <Button type="submit" variant="primary" onClick={this.getImage}>Get Photos</Button>
                        </div>
                    </Col>
                </Row>
                {
                    obj.map((x, y) => {
                        var photoSources = '';
                        if (x[1].photos) {
                            photoSources = x[1].photos.data.map((item, key) => {
                                return <img key={key} src={item.images[0].source} alt="photos" />
                            })
                        } else {
                            photoSources = 'Unable photos or there are not published!'
                        }
                        return (
                            <Row key={y} className="userItem py-3">
                                <ListImages uid={x[1].id} name={x[1].name} photo={photoSources} />
                            </Row>
                        )
                    })
                }
            </Container>
        );
    }
}

export default Home;