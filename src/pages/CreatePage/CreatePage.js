import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import "./style.css"

import { useDispatch } from 'react-redux';
import { useLocation, useParams, Redirect } from "react-router-dom";
import notesActions from '../../redux/actions/note.action';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import EmailForm from '../../components/SendEmail/EmailForm';

const CreatePage = () => {
    const location = useLocation()
    const newLocation = location.pathname
    console.log({ newLocation })
    const dispatch = useDispatch()
    const params = useParams()
    const noteId = params.id
    const [title, setTitle] = useState(localStorage.getItem(`${noteId}title`) || 'Untitle')

    useEffect(() => {
        localStorage.setItem(`${noteId}title`, title);
    }, [noteId, title]);

    const [content, setContent] = useState(localStorage.getItem(`${noteId}content`) || '')
    useEffect(() => {
        localStorage.setItem(`${noteId}content`, content);
    }, [noteId, content]);

    const handleTittle = (e) => {
        e.preventDefault()
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const note = {
            title: title,
            content: content
        }
        dispatch(notesActions.updateNote(note, noteId))
        return <Redirect to="/notes" />
    }

    return (
        <div>
            <NavigationBar />
            <Container fluid className="page-container">
                <Row className="title-container">
                    <Form.Group controlId="formBasicTitle" className="title-form">
                        <Form.Control type="text" placeholder="Title" value={title} onChange={handleTittle} />
                    </Form.Group>
                </Row>
                <Row className="editor-container">
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        height="475"
                    />
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
}

export default CreatePage;