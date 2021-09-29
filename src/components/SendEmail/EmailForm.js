import React, { useState } from "react";
import { useDispatch } from "react-redux";
import emailjs from "emailjs-com";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./style.css";

import notesActions from "../../redux/actions/note.action";

const EmailForm = () => {
  const [lgShow, setLgShow] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const noteId = params.id;

  const handleOnEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(notesActions.inviteCollaborator(email, noteId));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qlhxcu5",
        "template_fduplfo",
        e.target,
        "user_Gezzx4MXaacOSXKldlWt6"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div>
      <Button onClick={() => setLgShow(true)}>Invite collaborators</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>Invitee</Modal.Header>
        <Modal.Body>
          <form onSubmit={sendEmail}>
            <Row>
              <Col lg="4">
                {" "}
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleOnEmail}
                />
              </Col>
              <Col lg="6">
                {" "}
                <input
                  type="text"
                  placeholder="url"
                  name="message"
                  className="form-control"
                />
              </Col>
              <Col lg="2">
                {" "}
                <input
                  type="submit"
                  value="Send"
                  className="form-control btn"
                  onClick={handleSubmit}
                />
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      {/* <Form>
                    <Form.Row>
                        <Col>
                            <Form.Control type="email" placeholder="Email" name="email" />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Message" name="message" />
                        </Col>
                        <Col>
                            <Button onClick={sendEmail}>Send</Button>
                        </Col>
                    </Form.Row>
                </Form> */}
    </div>
  );
};

export default EmailForm;
