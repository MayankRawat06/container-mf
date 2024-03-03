import "./Cart.scss";
import React, { useEffect, useState } from "react";
import api from "../../api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("http://localhost:8091/cart/view");
        setCart(response.data);
      } catch (error) {
        // Handle error or redirect to login
      }
    };

    fetchProfile();
  }, []);

  if (!cart) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>Your cart</p>
      {cart &&
        cart.map((item) => {
          const id = item.id;
          return (
            <div key={id}>
              <p>ProductId : {item.productId}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
