import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import notesActions from "../../redux/actions/note.action";

import Sidebar from "../../components/Sidebar/Sidebar";

import NotesOfTag from "../../components/NotesOfTag";
import NoteCard from "../../components/NoteCard";

const NotesPage = () => {
  const notes = useSelector((state) => state.noteReducer.notes);
  const tags = useSelector((state) => state.noteReducer.tags);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  console.log("input", searchInput);
  const loading = useSelector((state) => state.noteReducer.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  useEffect(() => {
    dispatch(notesActions.getNotes(search));
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(notesActions.getAllTags());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg="2" sm="0" style={{ paddingRight: 0, paddingLeft: 0 }}>
          <Sidebar
            loading={loading}
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          />
        </Col>
        <Col lg="10" className="main-content">
          <Row
            style={{ height: "10%", paddingTop: "0.5rem" }}
            className="title-container"
          >
            <h2> My Notes</h2>
            <hr className="solid" style={{ color: "white" }}></hr>
          </Row>
          <Row style={{ paddingRight: "2rem" }}>
            <NotesOfTag tag="Untagged" />
            {tags?.length > 0 ? (
              tags.map((tag) => <NotesOfTag tag={tag} />)
            ) : (
              <></>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotesPage;
