import {Navbar, Nav, Container, NavDropdown, Button} from 'react-bootstrap'
import {FaSignOutAlt, FaSignInAlt} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import { logout } from '../slices/auth-slice'
import { useLogoutMutation } from '../slices/usersapi-slice'
import logo from '../assets/Logo.png'


function Header() {
  const {userInfo} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async() => { 
    try{
      await logoutApiCall().unwrap();
      dispatch(logout()); 
      navigate('/');
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div>
        <Navbar bg="dark" variant="dark" collapseOnSelect expand='lg'>
            <Container>
                <Navbar.Brand href="/"><img src={logo} style={{height: '50px'}} alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-toggle' />
                <Navbar.Collapse className="justify-content-end" id="navbar-toggle" >
                <Nav>{userInfo ? (
                  <Nav>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="/stocks">Stocks</NavDropdown.Item>
                    <NavDropdown.Item href="/sales">Sales</NavDropdown.Item>
                    <NavDropdown.Item href="/dailySales">Daily Sales</NavDropdown.Item>
                    <NavDropdown.Item href="/expenses">Expenses</NavDropdown.Item>

                    <NavDropdown.Item onClick={logoutHandler}><Button variant='danger' style={{ width:'100%'}}>Logout</Button></NavDropdown.Item>
                  </NavDropdown>
                  </Nav>
                ):(
                  <>
                    <Nav.Link href='/login'><FaSignInAlt /> Login</Nav.Link>
                    <Nav.Link  href='/register'><FaSignOutAlt /> Register</Nav.Link>
                  </>
                )}    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>          
    </div>
  )
}

export default Header