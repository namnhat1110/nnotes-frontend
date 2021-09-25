import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./style.css";

import authActions from "../../redux/actions/auth.action";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  console.log("auth", isAuthenticated);

  const handleOnEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleOnPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(authActions.login(user));
    if (isAuthenticated) {
      history.push(`/notes`);
    }
  };
  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <div>
      <NavigationBar />
      <Container fluid className="main-container">
        <Form className="form-box">
          <h3
            className="mt-2"
            style={{ textAlign: "center", fontWeight: "bolder" }}
          >
            {" "}
            Sign In
          </h3>
          <Form.Group className="mb-3 form-email" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleOnEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleOnPassword}
            />
          </Form.Group>
          <Form.Group className="form-btn">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted note">
              New to NNote? <Link to="/register">Register</Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
