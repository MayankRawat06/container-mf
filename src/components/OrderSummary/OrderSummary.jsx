import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import './OrderSummary.scss'
const OrderSummary = ({total}) => {
  return (
    <Container className="text-center">
      <Card className="shadow rounded mb-4">
        <Card.Header className="mt-2">
          <h3>Order Summary</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <p className="lead">Subtotal</p>
            </Col>
            <Col>₹{total}.00</Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className="lead">Taxes</p>
            </Col>
            <Col>₹{Math.round(total * 0.05)}.00</Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className="lead">Shipping</p>
            </Col>
            <Col>₹500.00</Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className="lead">Total</p>
            </Col>
            <Col>₹{total + 500 + Math.round(total * 0.05)}.00</Col>
          </Row>
          <Link className="link d-grid" to="/checkout">
            <Button className="btn-dark" size="lg">
              Checkout
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSummary;
