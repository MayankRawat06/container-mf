import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import './About.scss'
const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container className="mt-5 mb-5">
      <Row className="text-center">
        <h2>Why Tronix.Inc?</h2>
      </Row>
      <Row className="d-flex justify-content-center mt-5 gap-4">
        <Col className="text-center flex-column">
          <img
            data-aos="flip-down"
            className="mb-4"
            src="https://img3.hkrtcdn.com/20791/normal_2079092_o.png"
            alt="about-img"
          />
          <h3>100% Original & Authentic</h3>
          <h4 className="about-desc text-muted text-center">
            Tight control on sourcing and distribution
          </h4>
        </Col>
        <Col className="text-center flex-column">
          <img
            data-aos="flip-down"
            className="mb-4"
            src="https://img9.hkrtcdn.com/20791/normal_2079088_o.png"
            alt="about-img"
          />
          <h3>Wide range of products</h3>
          <h4 className="about-desc text-muted text-center">
            One-stop Shopping destination
          </h4>
        </Col>
        <Col className="text-center flex-column">
          <img
            data-aos="flip-down"
            className="mb-4"
            src="https://img1.hkrtcdn.com/20791/normal_2079090_o.png"
            alt="about-img"
          />
          <h3>Delivery all over India</h3>
          <h4 className="about-desc text-muted text-center">
            Shop from the comfort of your home
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
