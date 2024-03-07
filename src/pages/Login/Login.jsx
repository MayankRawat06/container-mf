import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
        // console.log(credentials);
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          credentials
        );
        // console.log(response.status);
        const { token } = response.data;
        setErrorMessage("");
        // Store the tokens in localStorage or secure cookie for later use
        localStorage.setItem("token", token);
        localStorage.setItem("role", parseJwt(token).role.authority);
        console.log(token);
        navigate("/");
        setLoggedIn(true);
      }
    } catch (error) {
      setErrorMessage("Invalid Credentials. Oops, Try again!");
      console.log(error);
    }
  };

  return (
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
  );
};

export default Login;
