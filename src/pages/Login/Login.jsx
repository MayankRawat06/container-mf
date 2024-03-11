import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function showPassword() {
  var x = document.getElementById("floatingPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const Login = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const [validated, setValidated] = useState(false);


  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    try {
      if (form.checkValidity() === true) {
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          credentials
        );
        const { token } = response.data;
        setErrorMessage("");
        // Store the tokens in localStorage or secure cookie for later use
        localStorage.setItem("token", token);
        localStorage.setItem("role", parseJwt(token).role.authority);
        navigate('/');
        setLoggedIn(true);
      }
    } catch (error) {
      setErrorMessage("Invalid Credentials. Oops, Try again!");
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <img className="mt-5" width="500" height="400"
            src="https://cdn.dribbble.com/users/2195595/screenshots/15497859/media/b5dbc012406f3c1238f358236039c7fc.gif"
            alt=""
          />
        </Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Container className="login-container">
              <span className="logo">Tronix.Inc</span>
              <h3 className="mt-2 mb-2">Login</h3>
              <p>{errorMessage}</p>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </FloatingLabel>
              <Form.Check
                className="mt-3"
                type="checkbox"
                id={`default-checkbox`}
                label={`Show Password`}
                onClick={showPassword}
              />
              <Button variant="primary" type="submit" className="login-btn">
                Login
              </Button>
              <p>
                Don't have an account? <Link to="/auth/register">Register</Link>
              </p>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
