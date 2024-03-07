import React from 'react'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import DisplayMain from "../../img/displayMain.png";
import './Display.scss'
const Display = () => {
  return (
    <Container className="empty-cart mt-5 mb-5 text-center">
      <Row className="text-center mb-5">
        <h2>Our Range</h2>
      </Row>
      <Row>
        <Link to='/products'>
          <img src={DisplayMain} alt="" className="display-img" />
        </Link>
      </Row>
    </Container>
  );
}

export default Display