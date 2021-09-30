import { toast } from "react-toastify";
import * as types from "../constants/note.constant";
import api from "../../apiService";
import { routeActions } from "./route.action";

const getNotes = (search) => async (dispatch) => {
  dispatch({ type: types.GET_NOTES_REQUEST, payload: null });
  try {
    let url = `${process.env.REACT_APP_BACKEND_API}api/notes`;
    if (search) {
      url += `?search=${search}`;
    }
    console.log("search", search);
    console.log("HEADERS", api.defaults.headers.common);
    const data = await api.get(url);
    dispatch({
      type: types.GET_NOTES_SUCCESS,
      payload: data.data.notes,
    });
    // toast.success("Get notes successfully");
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
    // toast.success("Get note detail successfully");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_NOTE_DETAIL_FAILURE, payload: error });
  }
};

const getCollabNotes = (search) => async (dispatch) => {
  dispatch({ type: types.GET_NOTES_REQUEST, payload: null });
  try {
    let url = `${process.env.REACT_APP_BACKEND_API}api/notes/collab`;
    if (search) {
      url += `?search=${search}`;
    }
    const data = await api.get(url);
    dispatch({
      type: types.GET_NOTES_SUCCESS,
      payload: data.data.notes,
    });
    // toast.success("Get notes successfully");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_NOTES_FAILURE, payload: error });
  }
};

const getAllTags = () => async (dispatch) => {
  dispatch({ type: types.GET_TAGS_REQUEST, payload: null });
  try {
    let url = `${process.env.REACT_APP_BACKEND_API}api/notes/tags`;
    const data = await api.get(url);
    dispatch({
      type: types.GET_TAGS_SUCCESS,
      payload: data.data.tags,
    });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_TAGS_FAILURE, payload: error });
  }
};

const getAllCollabTags = () => async (dispatch) => {
  dispatch({ type: types.GET_TAGS_REQUEST, payload: null });
  try {
    let url = `${process.env.REACT_APP_BACKEND_API}api/notes/collab-tags`;
    const data = await api.get(url);
    dispatch({
      type: types.GET_TAGS_SUCCESS,
      payload: data.data.tags,
    });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_TAGS_FAILURE, payload: error });
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
      payload: data.data.note,
    });
    toast.success("Create note successfully");
    dispatch(routeActions.redirect(`/notes/create/${data.data.note._id}`));
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.CREATE_NOTE_FAILURE, payload: error });
  }
};

const updateNote = (note) => async (dispatch) => {
  dispatch({ type: types.UPDATE_NOTE_REQUEST, payload: null });
  try {
    console.log(note);
    let url = `${process.env.REACT_APP_BACKEND_API}api/notes/${note._id}`;
    const data = await api.put(url, note);

    toast.success("Update note successfully");
    dispatch(routeActions.redirect("__UPDATE_NOTE__"));
    dispatch({
      type: types.UPDATE_NOTE_SUCCESS,
      payload: data.data.note,
    });
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

    toast.success("Delete note successfully");
    dispatch(notesActions.getNotes());
    dispatch({
      type: types.DELETE_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.DELETE_NOTE_FAILURE, payload: error });
  }
};

const inviteCollaborator = (email, noteId) => async (dispatch) => {
  dispatch({ type: types.INVITE_COLLAB_REQUEST, payload: null });
  try {
    let url = `${process.env.REACT_APP_BACKEND_API}api/notes/invite`;
    const data = await api.post(url, { email, noteId });
    console.log("hahaha", data);

    dispatch({
      type: types.INVITE_COLLAB_SUCCESS,
      payload: data.data.note,
    });
    toast.success("Invite collaborators successfully");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.INVITE_COLLAB_FAILURE, payload: error });
  }
};

const changeSelectedNote = (selectedNote) => ({
  type: types.CHANGE_SELECTED_NOTE,
  payload: selectedNote,
});

const notesActions = {
  getNotes,
  getNoteDetail,
  getCollabNotes,
  getAllTags,
  getAllCollabTags,
  createNote,
  updateNote,
  deleteNote,
  inviteCollaborator,
  changeSelectedNote,
};
export default notesActions;
