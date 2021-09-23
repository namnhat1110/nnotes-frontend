import React, { useEffect } from 'react';
import { Button, ButtonGroup, Dropdown, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import brand from './brand.png'
import './style.css';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md'

import { useDispatch, useSelector } from "react-redux";
import notesActions from '../../redux/actions/note.action';
import authActions from '../../redux/actions/auth.action';
import userActions from '../../redux/actions/user.action';

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(userActions.getCurrentUser());
    }, [dispatch]);

    const state = useSelector((state) => state);
    const singlenewnote = state.noteReducer.singlenewnote
    const currentUser = state.userReducer.currentUser

    const onCreate = () => {
        dispatch(notesActions.createNote({ title: "Untitle", content: "" }))
    }

    if (singlenewnote) {
        history.push(`/notes/create/${singlenewnote._id}`)
    }

    const onLogout = (e) => {
        e.preventDefault()
        dispatch(authActions.logout())
        history.push(`/`)
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='side-bar'>
                    <div className='brand-container'>
                        <Image className="nav-image" src={brand} alt="brand" />
                    </div>
                    <ButtonGroup vertical className="button-container">
                        <div className="first-button">
                            <Button block onClick={onCreate} className="inbutton" variant="success"><MdIcons.MdNoteAdd className="side-icon" />Create Note</Button>
                        </div>

                        <div className="second-button">

                            <Dropdown as={ButtonGroup} className="dropdown-btn" >
                                <Button variant="dark" style={{ width: "90%" }}> {currentUser?.username}</Button>
                                <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item >Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={onLogout}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </ButtonGroup>
                </div>
            </IconContext.Provider >
        </>
    )
}

export default SideBar