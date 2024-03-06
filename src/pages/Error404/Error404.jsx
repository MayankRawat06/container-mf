import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Error404Image from '../../img/error404.svg'
import "./Error404.scss";
const Error404 = () => {
  return (
    <Container className="empty-cart min-vh-100 mb-5 text-center">
      <img src={Error404Image} alt="" className="error-img" />
      <h3 className="display-6">
        It seems that you are lost in perpetual black hole. Let us help guide
        you out and get back you to home page.
      </h3>
      <Link className="link" to="/">
        <Button className="btn-light btn-outline-dark mt-4 mb-5" size="lg">
          Home
        </Button>
      </Link>
    </Container>
  );
};

export default Error404;
