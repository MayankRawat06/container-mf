import React, {useEffect} from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import order from '../../img/order.svg'
import "./Checkout.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";
const Checkout = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const checkoutCart = async () => {
    try {
      const response = await api.post("http://localhost:8091/cart/checkout");
      toast.success("Order placed successfully.", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
    }
  };
    useEffect(() => {
      checkoutCart();
    }, []);
  return (
    <Container className="empty-cart min-vh-100 mt-5 mb-5 text-center">
      <ToastContainer theme='dark'/>
      <img src={order} alt="" className="order-img" />
      <h5>THANK YOU</h5>
      <h3>YOUR ORDER IS CONFIRMED</h3>
      <h6 className='lead'>We'll be sending you an email confirmation shortly.</h6>
      <Link className="link" to="/products">
        <Button className="btn-light btn-outline-dark mt-5 mb-5" onClick={checkoutCart}>
          Continue Shopping
        </Button>
      </Link>
    </Container>
  );
}

export default Checkout