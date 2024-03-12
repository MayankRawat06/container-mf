import "./Profile.scss";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import api from "../../api";
import profileImage from "../../img/user.jpg";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import Spinner from "react-bootstrap/Spinner";
import "aos/dist/aos.css";
import "./Profile.scss";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("http://localhost:8080/users/details");
        setUser(response.data);
      } catch (error) {
        console.log(error);
        if (error.code == "ERR_NETWORK") {
          navigate("/error", { replace: true });
        }
      }
    };

    fetchProfile();
    AOS.init();
  }, []);

  if (!user) {
    return (
      <Container className="min-vh-100 d-flex justify-content-center">
        <Spinner className="position-fixed top-50" animation="grow" />
      </Container>
    );
  }
  return (
    <Container className="mt-5 min-vh-50 mb-5 ">
      <ToastContainer theme="dark" />
      <Row className="no-gutters">
        <Col md={6} lg={6}>
          <img data-aos="fade-right" src={profileImage} alt="profile-img" />
        </Col>
        <Col md={6} lg={6}>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
              <h3 className="display-5">{user.name}</h3>
            </div>
            <div className="p-3 bg-black text-white">
              <h6>{user.role}</h6>
              <h6>{user.email}</h6>
            </div>
            <div className="d-flex flex-row text-white mt-5 justify-content-between">
              {/* <Link className="link d-grid" to="/">
                <Button className="btn-dark" size="lg">
                  Manage Addresses
                </Button>
              </Link> */}
              <Link className="link d-grid" to="/reset-password">
                <Button className="btn-dark" size="lg">
                  Reset Password
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
