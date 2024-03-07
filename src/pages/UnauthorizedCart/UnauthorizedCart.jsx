import React from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import RedirectLogin from "../../img/redirectLogin.jpg";
import "./UnauthorizedCart.scss";
const UnauthorizedCart = () => {
  return (
    <Container className="empty-cart min-vh-100 mb-5 text-center">
      <img src={RedirectLogin} alt="" className="error-img" />
      <h3>
        Uh Oh!, Kindly Login.
      </h3>
      <Link className="link" to="/auth/login">
        <Button className="btn-light btn-outline-dark mt-4 mb-5" size="lg">
          Login
        </Button>
      </Link>
    </Container>
  );
}

export default UnauthorizedCart