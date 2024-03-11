import React, { useEffect } from "react";
import { useState } from "react";
import "./ResetPassword.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
function showPasswordOld() {
  var x = document.getElementById("floatingPasswordOld");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function showPasswordNew() {
  var x = document.getElementById("floatingPasswordNew");
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
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const [validated, setValidated] = useState(false);
  function validate() {
    let isValid = true;
    if (credentials.newPassword != credentials.confirmPassword) {
      isValid = false;
      setErrorMessage("Confirm password does not match");
    }
    if (credentials.oldPassword == credentials.newPassword) {
      isValid = false;
      setErrorMessage("Old password is same as new password.");
    }
    return isValid;
  }
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (validate()) {
      try {
        if (form.checkValidity() === true) {
          const response = await api.put(
            "http://localhost:8080/users/reset-password",
            {
              oldPassword: credentials.oldPassword,
              newPassword: credentials.newPassword,
            }
          );
          if (response.status != 200) {
            setErrorMessage("Invalid Credentials. Oops, Try again!");
          }
          setErrorMessage("");
          toast.success("Password updated successfully.", { autoClose: 1000 });
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }
      } catch (error) {
        setErrorMessage("Invalid Credentials. Oops, Try again!");
        console.log(error);
        if (error.code == "ERR_NETWORK") {
          navigate("/error", { replace: true });
        }
      }
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <ToastContainer theme="dark" />
      <Container className="login-container">
        <span className="logo">Tronix.Inc</span>
        <h3 className="mt-2 mb-2">Reset Password</h3>
        <p>{errorMessage}</p>
        <FloatingLabel
          controlId="floatingPasswordOld"
          label="Old Password"
          className="mt-2"
        >
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
          id={`default-checkbox-old`}
          label={`Show Password`}
          onClick={showPasswordOld}
        />
        <FloatingLabel
          controlId="floatingPasswordNew"
          label="New Password"
          className="mt-4"
        >
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
          id={`default-checkbox-new`}
          label={`Show Password`}
          onClick={showPasswordNew}
        />
        <FloatingLabel
          controlId="floatingPasswordNewConfirm"
          label="Confirm New Password"
          className="mt-4"
        >
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="primary" type="submit" className="login-btn">
          Reset Password
        </Button>
      </Container>
    </Form>
  );
};

export default ResetPassword;
