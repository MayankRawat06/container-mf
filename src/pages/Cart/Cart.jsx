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
import EmptyCart from "../EmptyCart/EmptyCart";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const Cart = ({ loggedIn, setLoggedIn }) => {
  const [total, setTotal] = useState(0);
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
  const getTotalPrice = () => {
    let subtotal = 0;
    console.log(productDetails);
    cart.map((item, index) => {
      const id = item.id;
      const product = productDetails[index] ? productDetails[index].data : null;
      subtotal = subtotal + (product ? product.price * item.quantity : 0);
      console.log(subtotal, product);
    });
    setTotal(subtotal);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    cart && getTotalPrice();
  }, [cart, productDetails]);

  if (!cart) {
    return <div className="min-vh-100 mt-5 mb-5">Loading...</div>;
  }

  if (cart.length == 0) {
    return (
      <EmptyCart/>
    );
  }
  return (
    <Container className="cart min-vh-100" fluid>
      <h1 className="m-5">Your Cart</h1>
      <div className="cart-wrapper">
        <Row className="cart-products-row">
          <Col md="auto">
            {
              productDetails &&
                cart &&
                cart.map((item, index) => {
                  const id = item.id;
                  const product = productDetails[index]
                    ? productDetails[index].data
                    : null;

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
                      fetchCart={fetchCart}
                    />
                  );
                })
            }
          </Col>
          <Col lg={4}>
            <Row>
              <OrderSummary total={total} />
            </Row>
            <Row>
              <Col>
                <Link className="link d-grid" to="/products">
                  <Button className="btn-light btn-outline-dark" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Cart;
