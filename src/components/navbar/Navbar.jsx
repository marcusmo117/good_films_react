import { Navbar, Nav, NavDropdown, Container, Col } from "react-bootstrap";
import LogoutComp from "../logout/Logout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchMovies from "./SearchMovies";

function Navibar({ tokenState, user, setTokenState }) {
  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profiles/" + user);
  };

  const navToFollowing = () => {
    navigate("/profiles/" + user);
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" style={{ color: "white", margin: 0 }}>
      {tokenState ? (
        <Container fluid>
          <Col className="d-flex justify-content-start align-items-center">
            <Navbar.Brand className="me-4">Good Films</Navbar.Brand>
            <Nav.Link className="d-inline-block me-4">
              <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className="d-inline-block me-4">
              <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
                Browse
              </Link>
            </Nav.Link>
          </Col>
          <Col xs={5}>
            <SearchMovies />
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <NavDropdown
              className="me-4"
              title={"Hi, " + user + "!"}
              id="navbarScrollingDropdown"
              align="end">
              <NavDropdown.Item id="profileDropdown" onClick={navToProfile}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item id="followingDropdown" onClick={navToFollowing}>
                Following
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item id="logoutDropdown">
                <LogoutComp setTokenState={setTokenState} />
              </NavDropdown.Item>
            </NavDropdown>
          </Col>
        </Container>
      ) : (
        <Container fluid>
          <Col className="d-flex justify-content-start align-items-center">
            <Navbar.Brand className="mr-4">Good Films</Navbar.Brand>
            <Nav.Link className="d-inline-block me-4">
              <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
                Browse
              </Link>
            </Nav.Link>
          </Col>
          <Col xs={3}>
            <SearchMovies />
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Nav.Link className="d-inline-block me-4">
              <Link to={"/login"} style={{ color: "inherit", textDecoration: "inherit" }}>
                Login
              </Link>
            </Nav.Link>
            <Nav.Link className="d-inline-block me-4">
              <Link to={"/register"} style={{ color: "inherit", textDecoration: "inherit" }}>
                Register
              </Link>
            </Nav.Link>
          </Col>
        </Container>
      )}
    </Navbar>
  );
}

export default Navibar;
