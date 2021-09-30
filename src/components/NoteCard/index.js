import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import './style.css'

import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import notesActions from "../../redux/actions/note.action";

dayjs.extend(relativeTime);

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card className="note-card my-2">
      <Card.Body>
        <div style={{ height: "60%" }}>
          <Card.Title className="title">{note.title}</Card.Title>
          <Card.Subtitle className="sub-title text-muted">
            <p>{dayjs(note.updatedAt).fromNow()}</p>
          </Card.Subtitle>
        </div>
        <div className="button-group">
          <Button
            variant="outline"
            onClick={() => dispatch(notesActions.deleteNote(note._id))}
          >
            <RiIcons.RiDeleteBin6Line />
          </Button>
          <Button
            variant="outline"
            onClick={() => history.push(`/notes/create/${note._id}`)}
          >
            <FaIcons.FaEdit />
          </Button>
          <Button
            variant="outline"
            onClick={() => history.push(`/notes/${note._id}`)}
          >
            <HiIcons.HiOutlineBookOpen />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
