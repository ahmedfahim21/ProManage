import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaSignOutAlt, FaSignInAlt} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import { logout } from '../slices/auth-slice'
import { useLogoutMutation } from '../slices/usersapi-slice'


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
                <Navbar.Brand href="/">ProManage</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-toggle' />
                <Navbar.Collapse className="justify-content-end" id="navbar-toggle" >
                <Nav>{userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <>
                    <Nav.Link to='/login'><FaSignInAlt /> Login</Nav.Link>
                    <Nav.Link to='/register'><FaSignOutAlt /> Register</Nav.Link>
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