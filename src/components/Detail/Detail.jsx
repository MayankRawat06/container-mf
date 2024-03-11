import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Detail.scss'
const Detail = () => {
  return (
    <Container className="empty-cart mt-5 mb-5 text-center">
      {/* <img src={EmptyCartImage} alt="" className="empty-cart-img" /> */}
      <h2 className="mb-5">About Us</h2>
      <Row className="d-flex gap-5">
        <Col>
          <h4 className="about-desc">
            Tronix.Inc allows you to walk away from the drudgery of daily needs
            shopping, ranging from Grocery, Fitness, Home, Electronics and
            Footwear and welcome an easy relaxed way of browsing and shopping
            for groceries. Discover new products and shop for all your food and
            daily needs from the comfort of your home or office. No more getting
            stuck in traffic jams, paying for parking, standing in long queues
            and carrying heavy bags – get everything you need, when you need,
            right at your doorstep. Food shopping online is now easy as every
            product on your monthly shopping list, is now available online at
            Tronix.Inc, India’s best online daily needs store.
          </h4>
        </Col>
        <Col >
          <img className='img-gif'
            src="https://cdn.dribbble.com/users/2675757/screenshots/15151563/media/8647117ba7efa39d75838e66e49dcaea.gif"
            alt=""
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Detail