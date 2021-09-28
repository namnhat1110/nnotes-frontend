import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import NoteCard from "../NoteCard";
import "./style.css";

const NotesOfTag = ({ tag }) => {
  const totalNotes = useSelector((state) => state.noteReducer.notes);
  const notes =
    tag === "Untagged"
      ? totalNotes.filter((note) => note.tags.length === 0)
      : totalNotes.filter((note) => note.tags.includes(tag));
  return (
    <Container>
      <Row>
        {notes?.length > 0 ? (
          <h1 className="list-section">
            <span>{tag}</span>
          </h1>
        ) : (
          <></>
        )}
      </Row>
      <Row>
        {notes?.map((note) => (
          <Col md="3" key={note._id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NotesOfTag;
