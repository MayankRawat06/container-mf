import React from 'react'
import './Login.scss'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
const Login = () => {
    return (
      <Container className="login-container">
        <span className="logo">Tronix.Inc</span>
        <h3 className="mt-2 mb-2">Login</h3>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" required/>
        </FloatingLabel>
        <Button variant="primary" type="submit" className="login-btn">
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </p>
      </Container>
    );
}

export default Login