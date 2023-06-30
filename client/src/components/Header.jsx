import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaSignOutAlt} from 'react-icons/fa'

function Header() {
  return (
    <div>
        <Navbar bg="dark" variant="dark" collapseOnSelect expand='lg'>
            <Container>
                <Navbar.Brand href="/">ProManage</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-toggle' />
                <Navbar.Collapse className="justify-content-end" id="navbar-toggle" >
                <Nav>
                    <Nav.Link href="/"><FaSignOutAlt /> Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>            
    </div>
  )
}

export default Header