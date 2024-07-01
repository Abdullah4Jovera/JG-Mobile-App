import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Pages/AuthContext';
import './MyNavbar.css'; // Import the custom CSS file

const MyNavbar = () => {
  const { state, logout } = useContext(AuthContext);
  const { userinfo } = state;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand">
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" exact className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/loans" className="nav-link">
              My Loans
            </Nav.Link>
            <Nav.Link as={NavLink} to="/membership" className="nav-link">
              Membership
            </Nav.Link>
            <Nav.Link as={NavLink} to="/flights" className="nav-link">
              Flights
            </Nav.Link>
            {userinfo ? (
              <NavDropdown title={userinfo.name} id="basic-nav-dropdown" className="nav-dropdown">
                <NavDropdown.Item onClick={logout} className="dropdown-item">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
