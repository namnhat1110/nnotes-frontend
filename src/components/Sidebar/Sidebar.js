import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  Image,
  Form,
  FormControl,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import brand from "./brand.png";
import "./style.css";
import { IconContext } from "react-icons";

import { useDispatch, useSelector } from "react-redux";
import notesActions from "../../redux/actions/note.action";
import authActions from "../../redux/actions/auth.action";
import { routeActions } from "../../redux/actions/route.action";

const SideBar = ({ searchInput, handleSearchInputChange, handleSubmit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.authReducer.user);
  const redirectTo = useSelector((state) => state.routeReducer.redirectTo);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__BACK__") {
        history.goBack();
        dispatch(routeActions.redirect(""));
      } else {
        history.push(redirectTo);
        dispatch(routeActions.redirect(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const onCreate = () => {
    dispatch(notesActions.createNote({ title: "Untitle", content: "" }));
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    history.push("/");
    // window.location.assign(window.location);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="side-bar">
          <div className="brand-container">
            <Image className="nav-image" src={brand} alt="brand" />
          </div>
          <ButtonGroup vertical className="button-container">
            <div className="first-button">
              <Form inline onSubmit={handleSubmit}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="search-form"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </Form>
              <Button
                block
                onClick={onCreate}
                className="inbutton"
                variant="success"
              >
                Create Note
              </Button>
              <Button
                block
                variant="outline-light"
                className="inbutton2"
                onClick={() => history.push("/")}
              >
                My notes
              </Button>
              <Button
                block
                variant="outline-light"
                className="inbutton2"
                onClick={() => history.push("/notes-collab")}
              >
                Collaborative notes
              </Button>
            </div>

            <div className="second-button">
              <Dropdown as={ButtonGroup} className="dropdown-btn">
                <Button variant="dark" style={{ width: "90%" }}>
                  {" "}
                  {currentUser?.username}
                </Button>
                <Dropdown.Toggle
                  split
                  variant="dark"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onLogout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </ButtonGroup>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
