import { toast } from "react-toastify";
import * as types from "../constants/note.constant";
import api from "../../apiService";

const getNotes = () => async (dispatch) => {
    dispatch({ type: types.GET_NOTES_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/notes`;
        const data = await api.get(url);
        dispatch({
            type: types.GET_NOTES_SUCCESS,
            payload: data.data.notes,
        });
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.GET_NOTES_FAILURE, payload: error });
    }
};

const getNoteDetail = (noteId) => async (dispatch) => {
    dispatch({ type: types.GET_NOTE_DETAIL_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/notes/${noteId}`;
        const data = await api.get(url);

        dispatch({
            type: types.GET_NOTE_DETAIL_SUCCESS,
            payload: data.data.note,
        });
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.GET_NOTE_DETAIL_FAILURE, payload: error });
    }
};

const createNote = (note) => async (dispatch) => {
    dispatch({ type: types.CREATE_NOTE_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/notes`;

        const data = await api.post(url, note);
        console.log("hahaha", data);

        dispatch({
            type: types.CREATE_NOTE_SUCCESS,
            payload: data.data.note
        });
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.CREATE_NOTE_FAILURE, payload: error });
    }
};

const updateNote = (note, noteId) => async (dispatch) => {
    dispatch({ type: types.UPDATE_NOTE_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/notes/${noteId}`;
        const data = await api.put(url, note);
        console.log("hahaha", data);

        dispatch({
            type: types.UPDATE_NOTE_SUCCESS,
            payload: data.data.note
        });
        window.location.href = "https://nnotes-editor.netlify.app/notes"
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.UPDATE_NOTE_FAILURE, payload: error });
    }
};

const deleteNote = (noteId) => async (dispatch) => {
    dispatch({ type: types.DELETE_NOTE_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/notes/${noteId}`;

        const data = await api.delete(url);
        console.log("hahaha", data);
        dispatch({
            type: types.DELETE_NOTE_SUCCESS,
            payload: data
        });

        dispatch(notesActions.getNotes())

    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.DELETE_NOTE_FAILURE, payload: error });
    }
};

const notesActions = { getNotes, getNoteDetail, createNote, updateNote, deleteNote };
export default notesActions;
