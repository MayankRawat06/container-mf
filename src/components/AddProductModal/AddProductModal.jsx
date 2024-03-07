import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import axios from "axios";
const AddProductModal = (props) => {
  const [specifications, setSpecifications] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [product, setProduct] = useState({
    title: "",
    quantityAvailable: 0,
    description: "",
    categoryID: "",
    categoryTitle: "",
    price: 0,
    imageUrl: "",
  });
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    console.log(product);
  };
  const handleSpecificationChange = (i, e) => {
    var prevSpec = [...specifications];

    if (e.target.name === "name") {
      prevSpec[i].name = e.target.value;
    }

    if (e.target.name === "value") {
      prevSpec[i].value = e.target.value;
    }

    setSpecifications(prevSpec);
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    // setValidated(true);

    try {
      if (form.checkValidity() === true) {
        console.log(product);
        const response = await axios.post(
          "http://localhost:8090/products/add",
          {
            ...product,
            categoryID: product.categoryTitle,
            specifications,
          }
        );
        console.log(response.status);
        if (response.status != 200) {
          setErrorMessage("Invalid Product Details. Oops, Try again!");
        }
        toast.success("Product Added Successfully.", { autoClose: 1000 });
        props.addProduct({
          ...product,
          categoryID: product.categoryTitle,
          specifications,
        });
        setProduct({
          title: "",
          quantityAvailable: 0,
          description: "",
          categoryID: "",
          categoryTitle: "",
          price: 0,
          imageUrl: "",
        });
        setSpecifications([]);
        props.onHide();
        setErrorMessage("");
        // Store the tokens in localStorage or secure cookie for later use
      }
    } catch (error) {
      setErrorMessage("Invalid Product Details. Oops, Try again!");
      console.log(error);
    }
  };
  const handleNewSpecification = () => {
    setSpecifications((prevState) => [...prevState, { name: "", value: "" }]);
    console.log("product", product);
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p>{errorMessage}</p>
          <FloatingLabel
            controlId="floatingInput"
            label="Product Title"
            className="mb-3"
          >
            <Form.Control
              name="title"
              value={product.name}
              type="text"
              placeholder=""
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Price"
                className="mb-3"
              >
                <Form.Control
                  name="price"
                  type="number"
                  min={10}
                  max={1000000}
                  value={product.price}
                  placeholder=""
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Quantity Available"
                className="mb-3"
              >
                <Form.Control
                  name="quantityAvailable"
                  type="number"
                  min={1}
                  max={5000}
                  value={product.quantityAvailable}
                  placeholder=""
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel
            controlId="floatingInput"
            label="Descripiton"
            className="mb-3"
          >
            <Form.Control
              name="description"
              as="textarea"
              rows={7}
              value={product.description}
              placeholder=""
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Category"
            className="mb-3"
          >
            <Form.Control
              name="categoryTitle"
              type="text"
              placeholder=""
              value={product.categoryTitle}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>
          <Button className="btn-dark" onClick={handleNewSpecification}>
            Add a Specification
          </Button>
          {specifications.map((spec, index) => (
            <Row key={"spec-key" + index}>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Specification Name"
                  className="mt-3 mb-3"
                >
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder=""
                    value={specifications[index]?.name}
                    required
                    onChange={(e) => handleSpecificationChange(index, e)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Specification Value"
                  className="mt-3 mb-3"
                >
                  <Form.Control
                    name="value"
                    type="text"
                    placeholder=""
                    value={specifications[index]?.value}
                    onChange={(e) => handleSpecificationChange(index, e)}
                    required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
          ))}
          <FloatingLabel
            controlId="floatingInput"
            label="Image URL"
            className="mt-3 mb-3"
          >
            <Form.Control
              name="imageUrl"
              type="text"
              placeholder=""
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-dark" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
