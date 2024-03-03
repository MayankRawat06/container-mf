import React from "react";
import { useState } from "react";
import "./Login.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    console.log(setCredentials);
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        credentials
      );
      console.log(response);
      const { token } = response.data;

      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem("token", token);
      console.log(token);
      setValidated(true);
      // Redirect or perform other actions upon successful login
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Container className="login-container">
        <span className="logo">Tronix.Inc</span>
        <h3 className="mt-2 mb-2">Login</h3>
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
        <Button variant="primary" type="submit" className="login-btn">
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </p>
      </Container>
    </Form>
  );
};

export default Login;
