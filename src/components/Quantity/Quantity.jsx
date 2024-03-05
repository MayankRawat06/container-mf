import React from "react";
import "./Quantity.scss";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import api from "../../api";
const Quantity = ({ productId, quantity, setQuantity }) => {
  // const handleQuantity = (e) => {
  // const value = e.target.value;
  // setQuantity(value);

  // };
  const handleQuantity = async (e) => {
    try {
      const value = e.target.value;
      setQuantity(value);
      const response = await api.post("http://localhost:8091/cart/update", {
        productId,
        quantity: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="quantity-wrapper">
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-min-price">Quantity</InputGroup.Text>
        <Form.Control
          name="quantity"
          defaultValue={quantity}
          type="number"
          min={1}
          onChange={handleQuantity}
        />
      </InputGroup>
    </div>
  );
};

export default Quantity;
