import { Navbar, Nav, NavDropdown, Container, Button, Form } from 'react-bootstrap';
import LogoutComp from '../logout/Logout';

function Navibar({tokenState, user, setTokenState}) {
  
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg" style={{color:"white"}}>
      {tokenState ?
        <Container fluid className="justify-content-start">
          <Navbar.Brand href="/">Home (feed)</Navbar.Brand>
          <Nav.Link href="/">Browse movies</Nav.Link>
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success">Search</Button>
          </Form>
          <NavDropdown className="mx-4" title={"Hi, " + user + "!"} id="navbarScrollingDropdown" align="end">
          <NavDropdown.Item href={'/profiles/' + user}>Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action4">
            Following
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <LogoutComp setTokenState={setTokenState}/>
          </NavDropdown.Item>
          </NavDropdown>
        </Container>
      :
        <Container fluid className="justify-content-start">
          <Navbar.Brand href="/">Browse movies</Navbar.Brand>
          <Container fluid className="d-flex justify-content-end">
            <Nav.Link className="d-inline-block mx-4" href="/login">Login</Nav.Link>
            <Nav.Link className="d-inline-block mx-4" href="/register">Register</Nav.Link>
          </Container>
        </Container>
      }
    </Navbar>
  );
}


export default Navibar;