import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md={12}>
                            <p>{this.props.copyright}</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;