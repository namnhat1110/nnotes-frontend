import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import NavigationBar from "../../components/NavigationBar/NavigationBar"
import './style.css'

import authActions from "../../redux/actions/auth.action"


const RegisterPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleOnUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleOnEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleOnPassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: username,
            email: email,
            password: password
        }
        dispatch(authActions.register(user))
        history.push('/login')
    }

    return (
        <div>
            <NavigationBar />
            <Container fluid className="register-container">
                <Form className="form-border">
                    <h3 className="mt-2" style={{ textAlign: "center", fontWeight: "bolder" }}> Register</h3>
                    <Form.Group className="mb-3 mt-2" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleOnUsername} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleOnEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={handleOnPassword} />
                    </Form.Group>
                    <Form.Group className="form-button">
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Group>
                    <Form.Group>
                        <Form.Text className="text-muted note">
                            Already have an account? Login <Link to="/login">here</Link>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

export default RegisterPage
