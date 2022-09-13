import { Navbar, Nav, NavDropdown, Container, Button, Form } from 'react-bootstrap';
import jwt_decode from 'jwt-decode'
import LogoutComp from '../logout/Logout';
import React, { useEffect, useState } from "react";


function Navibar() {
  const [tokenState, setTokenState] = useState()
  let user = null

  const getToken = async () => {
    const token = await localStorage.getItem("user_token")
    console.log('getEffect working')
    setTokenState(token)
    console.log('token state: ' + tokenState)
    if (tokenState) {
      user = jwt_decode(tokenState).data.username
      console.log(user)
  }}

  useEffect(() => {
    getToken()
  },[])

  
  useEffect(() => {
    getToken()
  },[tokenState])

  
  // let user = null
  // let token = null
  // if (localStorage.getItem("user_token")) {
  //   token = localStorage.getItem("user_token")
  //   user = jwt_decode(token).data.username
  //   console.log(user)
  // } 
  
  
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
          <NavDropdown className="mx-4" title={"logged in as " + tokenState && user} id="navbarScrollingDropdown">
          <NavDropdown.Item href={'/profiles/' + user}>Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action4">
            Following
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
          </NavDropdown>
          <LogoutComp/>
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