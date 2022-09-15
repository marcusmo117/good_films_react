import { Navbar, Nav, NavDropdown, Container, Form, Col } from "react-bootstrap";
import LogoutComp from "../logout/Logout";
import SearchMovies from "./SearchMovies";

function Navibar({ tokenState, user, setTokenState }) {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" style={{ color: "white" }}>
      {tokenState ? (
        <Container fluid>
          <Col className="d-flex justify-content-start align-items-center">
            <Navbar.Brand className="me-4">Good Films</Navbar.Brand>
            <Nav.Link className="d-inline-block me-4" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="d-inline-block me-4" href="/">
              Browse
            </Nav.Link>
          </Col>
          <Col xs={3}>{/* <SearchMovies /> */}</Col>
          <Col className="d-flex justify-content-end align-items-center">
            <NavDropdown
              className="me-4"
              title={"Hi, " + user + "!"}
              id="navbarScrollingDropdown"
              align="end">
              <NavDropdown.Item href={"/profiles/" + user}>Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Following</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <LogoutComp setTokenState={setTokenState} />
              </NavDropdown.Item>
            </NavDropdown>
          </Col>
        </Container>
      ) : (
        <Container fluid>
          <Col className="d-flex justify-content-start align-items-center">
            <Navbar.Brand className="mr-4">Good Films</Navbar.Brand>
            <Nav.Link className="d-inline-block me-4" href="/">
              Browse
            </Nav.Link>
          </Col>
          <Col xs={3}>{/* <SearchMovies /> */}</Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Nav.Link className="d-inline-block me-4" href="/login">
              Login
            </Nav.Link>
            <Nav.Link className="d-inline-block me-4" href="/register">
              Register
            </Nav.Link>
          </Col>
        </Container>
      )}
    </Navbar>
  );
}

export default Navibar;
