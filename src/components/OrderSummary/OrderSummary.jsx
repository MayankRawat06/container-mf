import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import './OrderSummary.scss'
import api from "../../api";
const handleCheckout = async(cart) => {
  if (localStorage.getItem("token") == undefined) {
    toast.success("Kindly Login.", {
      autoClose: 1000,
    });
    return;
  }
  try {
    const response = await api.post("http://localhost:8093/orders/add", cart);
    if (response.status == 200) {
      console.log("Order success!")
    }
  } catch (error) {
    console.log(error);
  }
};
const OrderSummary = ({cart, total}) => {
  return (
    <Container className="" fluid>
      <Card className="shadow rounded mb-4 order-card">
        <Card.Body className="p-4">
          <h3 className="order-text-bold order-title mb-4">Order Summary</h3>
          <Row>
            <Col className="text-start">
              <p className="lead text-muted">Subtotal</p>
            </Col>
            <Col className="lead text-end">₹{total}.00</Col>
          </Row>
          <hr />
          <Row>
            <Col className="text-start">
              <p className="lead text-muted">Taxes</p>
            </Col>
            <Col className="lead text-end">₹{Math.round(total * 0.05)}.00</Col>
          </Row>
          <hr />
          <Row>
            <Col className="text-start">
              <p className="lead text-muted">Shipping</p>
            </Col>
            <Col className="lead text-end">₹500.00</Col>
          </Row>
          <hr />
          <Row>
            <Col className="text-start">
              <p className="lead order-text-bold order-total">Order Total</p>
            </Col>
            <Col className="text-end order-text-bold order-total">
              ₹{total + 500 + Math.round(total * 0.05)}.00
            </Col>
          </Row>
          <Link className="link d-grid" to="/checkout">
            <Button className="btn-dark" size="lg" onClick={() => handleCheckout(cart)}>
              Checkout
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSummary;
