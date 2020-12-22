import {
  GET_SHARED_NOTES_DONE,
  GET_SHARED_NOTES_LOADING,
  GET_SHARED_NOTES_FAILED,
  GET_SHARED_NOTE_DETAIL_DONE,
  GET_SHARED_NOTE_DETAIL_LOADING,
  GET_SHARED_NOTE_DETAIL_FAILED,
} from "../../actions/sharedNotes/types";

const initialState = {
  notes: [],
  //
  noteDetail: {},
  getNoteDetailLoading: false,
  getNoteDetailFailed: false,
  getNoteDetailSuccess: false,
  //
  getNotesLoading: false,
  getNotesFailed: false,
  getNotesSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHARED_NOTES_DONE:
      return {
        ...state,
        notes: action.payload,
        getNotesLoading: false,
        getNotesFailed: false,
        getNotesSuccess: true,
      };
    case GET_SHARED_NOTES_FAILED:
      return {
        ...state,
        getNotesLoading: false,
        getNotesFailed: true,
        getNotesSuccess: false,
      };
    case GET_SHARED_NOTES_LOADING:
      return {
        ...state,
        notes: [],
        getNotesLoading: true,
        getNotesFailed: false,
        getNotesSuccess: false,
      };
    //
    case GET_SHARED_NOTE_DETAIL_DONE:
      return {
        ...state,
        noteDetail: action.payload,
        getNoteDetailLoading: false,
        getNoteDetailFailed: false,
        getNoteDetailSuccess: true,
      };
    case GET_SHARED_NOTE_DETAIL_FAILED:
      return {
        ...state,
        noteDetail: {},
        getNoteDetailLoading: false,
        getNoteDetailFailed: true,
        getNoteDetailSuccess: false,
      };
    case GET_SHARED_NOTE_DETAIL_LOADING:
      return {
        ...state,
        noteDetail: {},
        getNoteDetailLoading: true,
        getNoteDetailFailed: false,
        getNoteDetailSuccess: false,
      };
    //

    default:
      return state;
  }
}
