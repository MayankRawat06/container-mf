import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function logout(setLoggedIn) {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.clear();
  setLoggedIn(false);
}

const Header = ({ loggedIn, setLoggedIn }) => {
  return (
    <Navbar
      className="bg-body-tertiary my-navbar"
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      variant="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="nav-title">
          Tronix.Inc
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="icons nav-content">
            <Nav.Link className="nav-link nav-link-ltr" href="/products">
              Shop
            </Nav.Link>
            {loggedIn == true && localStorage.getItem("role") == "ADMIN" && (
              <>
                <Nav.Link href="/admin/users">Users</Nav.Link>
                <Nav.Link href="/admin/products">Products</Nav.Link>
                <Nav.Link href="/admin/categories">Categories</Nav.Link>
              </>
            )}
            {loggedIn == false ? (
              <Nav.Link href="/auth/login">
                <PersonOutlineOutlinedIcon />
              </Nav.Link>
            ) : (
              <NavDropdown
                title={<PersonOutlineOutlinedIcon />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => logout(setLoggedIn)}
                  href="/auth/login"
                >
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* <Nav.Link href="/">
            <FavoriteBorderOutlinedIcon />
          </Nav.Link> */}
            <Nav.Link className="cartIcon" href="/cart">
              <ShoppingCartOutlinedIcon />
              {/* <span>0</span> */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
