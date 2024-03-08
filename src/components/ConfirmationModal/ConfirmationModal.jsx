import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ConfirmationModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleDelete}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
