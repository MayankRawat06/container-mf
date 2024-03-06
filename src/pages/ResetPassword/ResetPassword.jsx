import React, { useEffect } from "react";
import { useState } from "react";
import "./ResetPassword.scss";
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
const ResetPassword = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newPassword: "",
  });
//   useEffect(() => {
//     if (loggedIn) {
//       navigate("/", { replace: true });
//     }
//   }, []);

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
        console.log(credentials);
        const response = await axios.post(
          "http://localhost:8080/users/resetPassword",
          credentials
        );
        console.log(response.status);
        if (response.status != 200) {
          setErrorMessage("Invalid Credentials. Oops, Try again!");
        }
        setErrorMessage("");
        // Store the tokens in localStorage or secure cookie for later use
        navigate("/");
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
        <h3 className="mt-2 mb-2">Reset Password</h3>
        <p>{errorMessage}</p>
        <FloatingLabel controlId="floatingPasswordOld" label="Old Password" className="mt-2">
          <Form.Control
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            value={credentials.oldPassword}
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
        <FloatingLabel controlId="floatingPasswordNew" label="New Password" className="mt-4">
          <Form.Control
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={credentials.newPassword}
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
          Reset Password
        </Button>
      </Container>
    </Form>
  );
};

export default ResetPassword;
