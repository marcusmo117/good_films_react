import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/auth";
import loginImage from "../../assets/login/LoginImage.png";
import rateMovie from "../../assets/login/RateMovie.png";
import Social from "../../assets/login/Social.png";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apis.auth(formData, "register");
      if (response.data.error) {
        toast.error(response.error);
        return;
      }
      toast.success("Registration Successful!");
      // store the token into localstorage / cookie
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  };

  return (
    <div className="login-page">
      <h1 className="my-5">Register</h1>

      <Container>
        <Row className="align-items-center">
          <Col>
            <div className="container">
              <Carousel fade>
                <Carousel.Item>
                  <Image className="img-fluid" src={loginImage} />
                  <Carousel.Caption>
                    <h3>Browse Movies</h3>
                    <p>Millions of movies to discover!</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image className="img-fluid" src={rateMovie} />
                  <Carousel.Caption>
                    <h3>Rate Movies</h3>
                    <p>Let your friends know what you think</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image className="img-fluid" src={Social} />
                  <Carousel.Caption>
                    <h3>Engage the community</h3>
                    <p>Find new friends and more!</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
          <Col>
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="username"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
