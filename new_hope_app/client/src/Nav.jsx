import React from "react"
import { Navbar, Nav as BootNav, Container, Row, Col } from 'react-bootstrap'

const Nav = ({ setMode }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <BootNav>
                    <Row>
                        <Col>
                            <BootNav.Item role="button" onClick={() => setMode(null)}>Home</BootNav.Item>
                        </Col>
                        <Col>
                            <BootNav.Item role="button" onClick={() => setMode('dog')}>Dogs</BootNav.Item>
                        </Col>
                        <Col>
                            <BootNav.Item role="button" onClick={() => setMode('staff')}>Staff</BootNav.Item>
                        </Col>
                        <Col>
                            <BootNav.Item role="button" onClick={() => setMode('homevisit')}>Homevisits</BootNav.Item>
                        </Col>
                    </Row>
                </BootNav>
            </Container>
        </Navbar>
    )
}

export default Nav