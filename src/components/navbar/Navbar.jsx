import { Navbar, Nav, NavDropdown, Container, Button, Form } from 'react-bootstrap';
import LogoutComp from '../logout/Logout';
import {Link, NavLink} from "react-router-dom"

function Navibar({tokenState, user, setTokenState}) {
  
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg" style={{color:"white"}}>
      {tokenState ?
        <Container fluid className="justify-content-start">
          <Navbar.Brand>
            <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Home (feed)</Link>
          </Navbar.Brand>
          <Nav.Link>
            <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Browse movies</Link>
          </Nav.Link>
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success">Search</Button>
          </Form>
          <NavDropdown className="mx-4" title={"Hi, " + user + "!"} id="navbarDropdown" align="end">
            <NavDropdown.Item id="profileDropdown">
              <NavLink to={"/profiles/" + user} style={{ color: 'inherit', textDecoration: 'inherit' }}>Profile</NavLink>
            </NavDropdown.Item>
            {/* <NavDropdown.Item id="followingDropdown">
              <Link to={"/profiles/" + user} style={{ color: 'inherit', textDecoration: 'inherit' }}>Following</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item id="logoutDropdown">
              <LogoutComp setTokenState={setTokenState}/>
            </NavDropdown.Item> */}
          </NavDropdown>
        </Container>
      :
        <Container fluid className="justify-content-start">
          <Navbar.Brand>
            <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Browse movies</Link>
          </Navbar.Brand>
          <Container fluid className="d-flex justify-content-end">
            <Nav.Link className="d-inline-block mx-4">
              <Link to={"/login"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Login</Link>
            </Nav.Link>
            <Nav.Link className="d-inline-block mx-4">
              <Link to={"/register"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Register</Link>
            </Nav.Link>
          </Container>
        </Container>
      }
    </Navbar>
  );
}


export default Navibar;