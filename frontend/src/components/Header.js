import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../redux/userLoginSlice'

const Header = () => {

  const dispatch = useDispatch()
  const naviagte = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    naviagte('/')
  }


  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>WEBKART</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className='fa fa-shopping-cart'></i>
                {" "}
                Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>

            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className='fa fa-user'></i>
                  {" "}
                  Sign In
                </Nav.Link>
              </LinkContainer>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default Header