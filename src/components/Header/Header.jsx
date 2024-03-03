import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./Header.scss"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Header = () => {
  return (
    <Navbar className="bg-body-tertiary my-navbar" expand="lg">
      <Container className="hi" fluid>
        <Navbar.Brand href="/" className="nav-title">
          Tronix.Inc
        </Navbar.Brand>
        <Nav className="icons nav-content d-flex flex-row">
          <Nav.Link className="nav-link nav-link-ltr" href="/products">
            Shop
          </Nav.Link>
          <Nav.Link href="/">
            <SearchIcon />
          </Nav.Link>
          <Nav.Link href="/auth/login">
            <PersonOutlineOutlinedIcon />
          </Nav.Link>
          <Nav.Link href="/">
            <FavoriteBorderOutlinedIcon />
          </Nav.Link>
          <Nav.Link className="cartIcon" href="/cart">
            <ShoppingCartOutlinedIcon />
            <span>0</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
