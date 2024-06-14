import "./Cart.scss";
import React, { useEffect, useState } from "react";
import api from "../../api";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import CartProduct from "../../components/CartProduct/CartProduct";
import EmptyCart from "../EmptyCart/EmptyCart";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import UnauthorizedCart from "../UnauthorizedCart/UnauthorizedCart";
const Cart = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
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
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
    }
  };
  const getTotalPrice = () => {
    let subtotal = 0;
    cart.map((item, index) => {
      const id = item.id;
      const product = productDetails[index] ? productDetails[index].data : null;
      subtotal = subtotal + (product ? product.price * item.quantity : 0);
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
    return (
      <Container className="min-vh-100 d-flex justify-content-center">
        <Spinner className="position-fixed top-50" animation="grow" />
      </Container>
    );
  }
  if (!loggedIn) {
    return (<UnauthorizedCart/>);
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
              <OrderSummary cart={cart} total={total} />
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
