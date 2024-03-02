import React from "react";
import "./Register.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Register = () => {
  return (
    <Form>
      <Container className="register-container">
        <span className="logo">Tronix.Inc</span>
        <h3 className="mt-2 mb-2">Register</h3>
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
              />
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
              />
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
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$"
            title="Must contain at least one digit, one uppercase, one lowercase letter, a special character, and at least 8 or more characters"
            required
          />
        </FloatingLabel>
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
