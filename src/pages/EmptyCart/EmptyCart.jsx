import React from 'react'
import emptyCart from "../../img/emptyCart.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import './EmptyCart.scss'
const EmptyCart = () => {
  return (
    <Container className="empty-cart min-vh-100 mt-5 mb-5 text-center">
      <img src={emptyCart} alt="" className="empty-cart-img" />
      <h3 className="display-6">It's empty in here.</h3>
      <Link className="link" to="/products">
        <Button className="btn-light btn-outline-dark mt-5 mb-5">
          Continue Shopping
        </Button>
      </Link>
    </Container>
  );
}

export default EmptyCart