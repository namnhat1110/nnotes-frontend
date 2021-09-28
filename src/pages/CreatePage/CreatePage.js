import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import notesActions from "../../redux/actions/note.action";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EmailForm from "../../components/SendEmail/EmailForm";
import { routeActions } from "../../redux/actions/route.action";

const CreatePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const noteId = params.id;
  const [tags, setTags] = useState([]);
  const selectedNote = useSelector((state) => state.noteReducer.selectedNote)

  const handleChangeTag = (tags) => {
    setTags(tags)
  }
  const redirectTo = useSelector((state) => state.routeReducer.redirectTo);
  const history = useHistory();

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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(notesActions.getNoteDetail(noteId))
  }, [noteId, dispatch])


  const handleTittle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  let previousNote = {
    title: title,
    content: content,
    tags: tags
  }

  console.log("this previous note", previousNote)

  const handleSubmit = (e) => {
    e.preventDefault();
    // const note = {
    //   title: title,
    //   content: content,
    //   tags: tags
    // };
    dispatch(notesActions.updateNote(previousNote, noteId, history));
  };

  useEffect(() => {
    if (selectedNote) {
      setTitle(title)
    }
  })


  return (
    <div>
      <NavigationBar />
      <Container fluid className="page-container">
        <Row className="title-container mb-2">
          <Form.Group controlId="formBasicTitle" className="title-form">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTittle}
            />
          </Form.Group>
          <TagsInput
            value={tags}
            onChange={handleChangeTag}
          />
        </Row>
        <Row className="editor-container">
          <MDEditor value={content} onChange={setContent} height="475" />
        </Row>
        <Row className="footer-container">
          <Col lg="6">

          </Col>
          <Col lg="3">
            <EmailForm />
          </Col>
          <Col lg="3">
            <Button onClick={handleSubmit} style={{ width: "100 %" }}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePage;
