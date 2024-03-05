import "./Cart.scss";
import React, { useEffect, useState } from "react";
import api from "../../api";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import CartProduct from "../../components/CartProduct/CartProduct";
const Cart = () => {
  const [cart, setCart] = useState(null);
  const deleteUtils = (cartData) => {
    setCart(cartData);
    fetchCart();
  };
  const [productDetails, setProductDetails] = useState([]);
  let productResults = [];
  const getProducts = async (cart) => {
    const productPromises =
      cart &&
      cart.map(
        async (item) =>
          await axios.get(`http://localhost:8090/products/${item.productId}`)
      );
    productResults = await Promise.all(productPromises);
    setProductDetails(productResults);
  };
  const fetchCart = async () => {
    try {
      const cartResponse = await api.get("http://localhost:8091/cart/view");
      setCart(cartResponse.data);
      await getProducts(cartResponse.data);
    } catch (error) {
      // Handle error or redirect to login
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="cart" fluid>
      <h1 className="m-5">Your Cart</h1>
      <Row>
        <Col sm={10}>
          {
            // if delete, delete from both states
            productDetails &&
              cart &&
              cart.map((item, index) => {
                const id = item.id;
                const product = productDetails[index]
                  ? productDetails[index].data
                  : null;
                console.log(product && product.title);
                return (
                  <CartProduct
                    key={id}
                    productId={item.productId}
                    title={product && product.title}
                    imageUrl={product && product.imageUrl}
                    price={product && product.price}
                    quantityInitial={item.quantity}
                    quantityAvailable={product && product.quantityAvailable}
                    cart={cart}
                    deleteUtils={deleteUtils}
                  />
                );
              })
          }
        </Col>
        <Col>
          <Link className="link" to="/products">
            Continue Shopping
          </Link>
        </Col>
        <Col>
          <Link className="link" to="/products">
            Checkout
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
