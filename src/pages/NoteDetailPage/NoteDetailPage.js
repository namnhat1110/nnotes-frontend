import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import notesActions from '../../redux/actions/note.action';
import { useParams } from "react-router-dom";
import { Card, Container } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import './style.css'


const NoteDetailPage = () => {
    const params = useParams()
    const noteId = params.id
    const state = useSelector((state) => state);
    const note = state.noteReducer.selectedNote;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(notesActions.getNoteDetail(noteId));
    }, [noteId, dispatch]);

    return (
        <Container className="note-container">
            <Card style={{ width: '100%', height: "100%" }}>
                <Card.Body>
                    <Card.Title>{note?.title}</Card.Title>

                    <Card.Text>
                        <MDEditor.Markdown source={note?.content} />
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default NoteDetailPage