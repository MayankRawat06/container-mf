import React, { useState, useEffect } from "react";
import "./CartProduct.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloseButton from "react-bootstrap/CloseButton";
import Quantity from "../Quantity/Quantity";
import api from "../../api";
import AOS from "aos";
import "aos/dist/aos.css";
const CartProduct = ({
  productId,
  title,
  imageUrl,
  price,
  quantityInitial,
  quantityAvailable,
  cart,
  deleteUtils,
  fetchCart,
}) => {
  const [quantity, setQuantity] = useState(quantityInitial);
  const handleDelete = async () => {
    try {
      const response = await api.post("http://localhost:8091/cart/update", {
        productId,
        quantity: 0,
      });
      if (response.status == 200) {
        const newCart = cart.filter((item) => item.productId !== productId);
        deleteUtils(newCart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container key={productId} className="cart-product mt-5">
      <Row data-aos="zoom-in-up" className="">
        <Col>
          <img className="cart-product-image" src={imageUrl} alt="" />
        </Col>
        <Col className="cart-product-info">
          <h3 className="cart-product-title">{title}</h3>
          <h3>₹{price}.00</h3>
        </Col>
        <Col>
          <Quantity
            productId={productId}
            quantity={quantity}
            setQuantity={setQuantity}
            fetchCart={fetchCart}
          ></Quantity>
        </Col>
        <Col>
          <CloseButton onClick={handleDelete} />
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default CartProduct;
