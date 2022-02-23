import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
class NavBarComp extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="/">Facebook Backup</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/messengers">
                            <Nav.Link>Messengers</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBarComp;