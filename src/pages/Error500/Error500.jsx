import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Error500Image from '../../img/error500.svg'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Error500.scss";
const Error500 = () => {
  return (
    <Container className="empty-cart min-vh-100 mb-5">
      <Row className="mt-5">
        <Col>
          <h1 className="display-1 mt-5 fw-bold">Shoot!</h1>
          <h2>Well, This is unexpected.</h2>
          <h3 className="display-6 mb-5">
            An error has occured and we're working to fix the problem.
            We'll be up and running shortly.
          </h3>
          {/* <Link className="link" to="/">
            <Button className="btn-light btn-outline-dark" size="lg">
              Home
            </Button>
          </Link> */}
        </Col>
        <Col>
          <img src={Error500Image} alt="" className="error-img" />
        </Col>
      </Row>
    </Container>
  );
};

export default Error500;
