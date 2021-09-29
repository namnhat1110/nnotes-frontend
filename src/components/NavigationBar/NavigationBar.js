import React from "react";
import { Navbar, Form, Nav, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import brand from "./brand.png";
import "./style.css";

const NavigationBar = () => {
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  return (
    <div>
      <Navbar className="nav-bar" bg="black" variant="dark">
        <Navbar.Brand className="mr-auto" href="/">
          <Image className="nav-image" src={brand} alt="brand" />
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          {isAuthenticated ? (
            <></>
          ) : (
            <Button
              className="nav-button"
              variant="outline-light"
              onClick={() => history.push(`/login`)}
            >
              Sign In
            </Button>
          )}
        </Form>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
