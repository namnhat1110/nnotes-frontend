import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import TagsInput from "react-tagsinput";
import ScrollToBottom from 'react-scroll-to-bottom';
import "react-tagsinput/react-tagsinput.css";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import notesActions from "../../redux/actions/note.action";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EmailForm from "../../components/SendEmail/EmailForm";
import { routeActions } from "../../redux/actions/route.action";

import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
let socket;

const socketTypes = {
  NOTIFICATION: "NOTIFICATION",
  ERROR: "ERROR",
  MSG_INIT: "MESSAGE_INIT",
  MSG_SEND: "MESSAGE_SEND",
  MSG_RECEIVE: "MESSAGE_RECEIVE",
  NOTE_UPDATE: "NOTE_UPDATE",
};

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [tags, setTags] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log(onlineUsers)
  const params = useParams();
  const noteId = params.id;

  const selectedNote = useSelector((state) => state.noteReducer.selectedNote);
  const currentUser = useSelector((state) => state.authReducer.user);
  const accessToken = useSelector((state) => state.authReducer.accessToken);

  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.routeReducer.redirectTo);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__BACK__") {
        history.goBack();
        dispatch(routeActions.redirect(""));
      } else if (redirectTo === "__UPDATE_NOTE__") {
        dispatch(routeActions.redirect(""));
        console.log("UPDATED NOTE");
        if (selectedNote?._id) {
          socket.emit(socketTypes.NOTE_UPDATE, {
            noteId: selectedNote._id,
          });
        }
      } else {
        history.push(redirectTo);
        dispatch(routeActions.redirect(""));
      }
    }
  }, [redirectTo, dispatch, history, selectedNote]);

  useEffect(() => {
    if (noteId) {
      if (selectedNote) {
        setTitle(selectedNote.title);
        setTags(selectedNote.tags);
        setContent(selectedNote.content);
        if (selectedNote.author === currentUser?._id) setIsAuthor(true);
      } else {
        dispatch(notesActions.getNoteDetail(noteId));
      }
    }
  }, [dispatch, noteId, selectedNote, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      _id: selectedNote._id,
      title: title,
      content: content,
      tags: tags,
    };
    dispatch(notesActions.updateNote(note));
  };

  useEffect(() => {
    if (accessToken && selectedNote?._id) {
      socket = socketIOClient(process.env.REACT_APP_BACKEND_API, {
        query: {
          accessToken,
        },
      });

      socket.emit(socketTypes.MSG_INIT, {
        noteId: selectedNote._id,
      });

      socket.on(socketTypes.NOTIFICATION, (data) => {
        if (data.onlineUsers) {
          setOnlineUsers(data.onlineUsers);
        }
        if (data.comments) {
          setComments(data.comments);
        }
        if (data.newComment) {
          setComments((comments) => [...comments, data.newComment]);
        }
        if (data.updatedNote) {
          dispatch(notesActions.changeSelectedNote(data.updatedNote));
        }
      });

      socket.on(socketTypes.ERROR, (err) => {
        toast.error(err);
      });
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [accessToken, selectedNote, dispatch]);

  const handleSendComment = (e) => {
    e.preventDefault();
    if (selectedNote?._id) {
      socket.emit(socketTypes.MSG_SEND, {
        from: currentUser._id,
        noteId: selectedNote._id,
        body: newComment,
      });
      setNewComment("");
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container
        fluid
        className="page-container d-flex flex-column justify-content-between"
      >
        <Row className="title-container mb-2">
          <Form.Group controlId="formBasicTitle" className="title-form">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isAuthor}
            />
          </Form.Group>
          <TagsInput
            value={tags}
            onChange={(newTags) => setTags(newTags)}
            disabled={!isAuthor}
          />
        </Row>
        <Row className="editor-container">
          <Col lg="9">
            <MDEditor
              value={content}
              onChange={(newValue) => setContent(newValue)}
              height="440"
              preview={isAuthor ? "live" : "preview"}
              hideToolbar={!isAuthor}
            />
          </Col>
          <Col lg="3">
            <div className="display-box">
              <ScrollToBottom>
                <ul className="list-unstyled">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <li key={comment._id}>
                        <div className="pl-2">
                          <span>
                            <strong>{comment.author.username}:</strong>
                          </span>
                          <span className="text-secondary">{comment.body}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </ScrollToBottom>
            </div>
            <div className="chat-box">
              <Form onSubmit={handleSendComment}>
                <Form.Row>
                  <Form.Control
                    type="text"
                    placeholder="Comment"
                    name="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </Form.Row>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="footer-container">
          <Col lg="6"></Col>
          {isAuthor ? (
            <>
              <Col lg="3">
                <EmailForm />
              </Col>
              <Col lg="3">
                <Button onClick={handleSubmit} style={{ width: "100 %" }}>
                  Save
                </Button>
              </Col>
            </>
          ) : (
            <>

            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CreatePage;
