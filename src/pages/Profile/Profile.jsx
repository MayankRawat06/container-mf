import "./Profile.scss";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import api from "../../api";
import profileImage from "../../img/user.jpg";
import { Link } from "react-router-dom";
import "./Profile.scss";
const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("http://localhost:8080/users/details");
        setUser(response.data);
      } catch (error) {
        // Handle error or redirect to login
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="mt-5 mb-5 ">
      <Row class="no-gutters">
        <Col md={6} lg={6}>
          <img src={profileImage} />
        </Col>
        <Col md={6} lg={6}>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
              <h3 class="display-5">{user.name}</h3>
            </div>
            <div class="p-3 bg-black text-white">
              <h6>{user.role}</h6>
              <h6>{user.email}</h6>
            </div>
            <div class="d-flex flex-row text-white mt-5 justify-content-between">
              <Link className="link d-grid" to="/">
                <Button className="btn-dark" size="lg">
                  Manage Addresses
                </Button>
              </Link>
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
