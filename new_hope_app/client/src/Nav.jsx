import React from "react"
import { Navbar, Nav as BootNav, Container} from 'react-bootstrap'

const Nav = ({ setMode }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                    <BootNav className="me-auto">
                        <BootNav.Item onClick={() => setMode(null)}>Home</BootNav.Item>
                        <BootNav.Item onClick={() => setMode('dog')}>Dogs</BootNav.Item>
                        <BootNav.Item onClick={() => setMode('staff')}>Staff</BootNav.Item>
                        <BootNav.Item onClick={() => setMode('homevisit')}>Homevisit</BootNav.Item>
                    </BootNav>
            </Container>
        </Navbar>
    )
}

export default Nav