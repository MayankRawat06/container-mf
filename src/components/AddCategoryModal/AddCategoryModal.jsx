import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import axios from "axios";
const AddCategoryModal = (props) => {
  const [validated, setValidated] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState({
    title: "",
    description: "",
    categoryImageUrl: "",
  });
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    try {
      if (form.checkValidity() === true) {
        const response = await axios.post(
          "http://localhost:8090/categories/add",
          category
        );
        console.log(response.status);
        if (response.status != 200) {
          setErrorMessage("Invalid Category Details. Oops, Try again!");
        }
        toast.success("Category Added Successfully.", { autoClose: 1000 });
        props.addCategory({
          ...category,
        });
        setCategory({
          title: "",
          description: "",
          categoryImageUrl: "",
        });
        props.onHide();
        setErrorMessage("");
        // Store the tokens in localStorage or secure cookie for later use
      }
    } catch (error) {
      setErrorMessage("Invalid Category Details. Oops, Try again!");
      console.log(error);
    }
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <p>{errorMessage}</p>
          <FloatingLabel
            controlId="floatingInput"
            label="Category Title"
            className="mb-3"
          >
            <Form.Control
              name="title"
              value={category.title}
              type="text"
              placeholder=""
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Descripiton"
            className="mb-3"
          >
            <Form.Control
              name="description"
              as="textarea"
              rows={7}
              value={category.description}
              placeholder=""
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Image URL"
            className="mt-3 mb-3"
          >
            <Form.Control
              name="categoryImageUrl"
              type="text"
              value={category.categoryImageUrl}
              placeholder=""
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </FloatingLabel>
          <Button className="btn-dark" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;
