import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.scss";
import { Link } from "react-router-dom";
import paymentvisa from "../../img/payment-2.svg";
import paymentmastercard from "../../img/payment-1.svg";
const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row className="top">
        <Col className="item">
          <h1>Categories</h1>
          <Link className="link" to="">
            Grocery
          </Link>
          <Link className="link" to="">
            Electronics
          </Link>
          <Link className="link" to="">
            Footwear
          </Link>
          <Link className="link" to="">
            Home
          </Link>
        </Col>
        <Col className="item">
          <h1>Links</h1>
          <Link className="link">FAQ</Link>
          <Link className="link">Pages</Link>
          <Link className="link">Cookies</Link>
        </Col>
        <Col className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </Col>
        <Col className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </Col>
      </Row>
      <Row className="bottom">
        <Col className="left">
          <span className="logo">Tronix.Inc</span>
          <span className="copyright">
            © Copyright 2024. All Rights Reserved
          </span>
        </Col>
        <Col className="right d-flex gap-5">
          <img src={paymentvisa} alt="payment-img" />
          <img src={paymentmastercard} alt="payment-img" />
          <img
            src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-bluebox-solid.svg"
            alt="payment-img"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/383px-RuPay.svg.png"
            alt="payment-img"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
