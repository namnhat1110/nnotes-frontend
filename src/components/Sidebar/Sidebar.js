import React, { useEffect } from "react";
import { Button, ButtonGroup, Dropdown, Image, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import brand from "./brand.png";
import "./style.css";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import notesActions from "../../redux/actions/note.action";
import authActions from "../../redux/actions/auth.action";
import userActions from "../../redux/actions/user.action";
import { routeActions } from "../../redux/actions/route.action";

const SideBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const loading = useSelector((state) => state.noteReducer.loading)

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


  useEffect(() => {
    dispatch(userActions.getCurrentUser());
  }, [dispatch]);

  //   const singlenewnote = useSelector((state) => state.noteReducer.singlenewnote);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const onCreate = () => {
    dispatch(notesActions.createNote({ title: "Untitle", content: "" }));
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    history.push(`/`);
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
              <Form inline>
                <FormControl type="text" placeholder="Search" className="search-form"
                />
              </Form>
              <Button
                block
                onClick={onCreate}
                className="inbutton"
                variant="success"
              >
                <MdIcons.MdNoteAdd className="side-icon" />
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
                href="/notes-collab"
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
                  <Dropdown.Item>Edit</Dropdown.Item>
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
