import * as types from "../constants/note.constant";

const initialState = {
  notes: [],
  loading: false,
  selectedNote: null,
  tags: [],
};

const noteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_NOTES_REQUEST:
      return { ...state, loading: true };
    case types.GET_NOTES_SUCCESS:
      return { ...state, notes: payload, loading: false };
    case types.GET_NOTES_FAILURE:
      return { ...state, loading: false };

    case types.GET_TAGS_REQUEST:
      return { ...state, loading: true };
    case types.GET_TAGS_SUCCESS:
      return { ...state, tags: payload, loading: false };
    case types.GET_TAGS_FAILURE:
      return { ...state, loading: false };

    case types.GET_NOTE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case types.GET_NOTE_DETAIL_SUCCESS:
      return { ...state, selectedNote: payload, loading: false };
    case types.GET_NOTE_DETAIL_FAILURE:
      return { ...state, loading: false };

    case types.GET_COLLAB_NOTES_REQUEST:
      return { ...state, loading: true };
    case types.GET_COLLAB_NOTES_SUCCESS:
      return { ...state, notes: payload, loading: false };
    case types.GET_COLLAB_NOTES_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_NOTE_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_NOTE_SUCCESS:
      return { ...state, selectedNote: payload, loading: false };
    case types.CREATE_NOTE_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_NOTE_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_NOTE_SUCCESS:
      return { ...state, selectedNote: payload, loading: false };
    case types.UPDATE_NOTE_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_NOTE_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_NOTE_SUCCESS:
      return { ...state, selectedNote: payload, loading: false };
    case types.DELETE_NOTE_FAILURE:
      return { ...state, loading: false };

    case types.INVITE_COLLAB_REQUEST:
      return { ...state, loading: true };
    case types.INVITE_COLLAB_SUCCESS:
      return { ...state, selectedNote: payload, loading: false };
    case types.INVITE_COLLAB_FAILURE:
      return { ...state, loading: false };

    case types.CHANGE_SELECTED_NOTE:
      return { ...state, selectedNote: payload };
    default:
      return state;
  }
};

export default noteReducer;
