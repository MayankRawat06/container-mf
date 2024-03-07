import React from "react";
import { useState, useEffect } from "react";
import "./Register.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
function showPassword() {
  var x = document.getElementById("floatingPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
const Register = ({ loggedIn, setLoggedIn }) => {
  const [validated, setValidated] = useState(false);


  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
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
    console.log(credentials);
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    try {
      if (form.checkValidity() === true) {
        console.log(credentials);
        const response = await axios.post(
          "http://localhost:8080/auth/register",
          {
            "name": credentials.fname + " " + credentials.lname,
            "password": credentials.password,
            "email":credentials.email
          }
        );
        console.log(response.status);
        const { token } = response.data;
        setErrorMessage("");
        // Store the tokens in localStorage or secure cookie for later use
        localStorage.setItem("token", token);
        localStorage.setItem("role", "USER");
        console.log(token);
        navigate("/");
        setLoggedIn(true);
      }
      // setValidated(true);
    } catch (error) {
      // Handle login error
      setErrorMessage("Invalid Input. Oops, Try again!");
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
    }
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Container className="register-container">
        <span className="logo">Tronix.Inc</span>
        <h3 className="mt-2 mb-2">Register</h3>
        <p>{errorMessage}</p>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                name="fname"
                type="text"
                placeholder="John"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                name="lname"
                type="text"
                placeholder="Doe"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
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
            Password must contain at least one digit, one uppercase, one
            lowercase letter, a special character, and at least 8 or more
            characters
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Check
          className="mt-3"
          type="checkbox"
          id={`default-checkbox`}
          label={`Show Password`}
          onClick={showPassword}
        />
        <Button variant="primary" type="submit" className="register-btn">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </Container>
    </Form>
  );
};

export default Register;
