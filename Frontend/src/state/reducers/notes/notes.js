import {
  ADD_NOTE_DONE,
  ADD_NOTE_LOADING,
  ADD_NOTE_FAILED,
  GET_NOTES_DONE,
  GET_NOTES_LOADING,
  GET_NOTES_FAILED,
  PATCH_NOTE_DONE,
  PATCH_NOTE_LOADING,
  PATCH_NOTE_FAILED,
  GET_NOTE_DETAIL_DONE,
  GET_NOTE_DETAIL_LOADING,
  GET_NOTE_DETAIL_FAILED,
} from "../../actions/notes/types";

import { findAndReplace } from "../algorithms";

const initialState = {
  notes: [],
  //
  addNoteLoading: false,
  addNoteFailed: false,
  addNoteSuccess: false,
  //
  patchNoteLoading: false,
  patchNoteFailed: false,
  patchNoteSuccess: false,
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
    case ADD_NOTE_FAILED:
      return {
        ...state,
        addNoteLoading: false,
        addNoteFailed: true,
        addNoteSuccess: false,
      };
    case ADD_NOTE_DONE:
      return {
        ...state,
        addNoteLoading: false,
        addNoteFailed: false,
        addNoteSuccess: true,
      };
    case ADD_NOTE_LOADING:
      return {
        ...state,
        addNoteLoading: true,
        addNoteFailed: false,
        addNoteSuccess: false,
      };
    //
    case GET_NOTES_DONE:
      return {
        ...state,
        notes: action.payload,
        getNotesLoading: false,
        getNotesFailed: false,
        getNotesSuccess: true,
      };
    case GET_NOTES_FAILED:
      return {
        ...state,
        getNotesLoading: false,
        getNotesFailed: true,
        getNotesSuccess: false,
      };
    case GET_NOTES_LOADING:
      return {
        ...state,
        notes: [],
        getNotesLoading: true,
        getNotesFailed: false,
        getNotesSuccess: false,
      };
    //
    case GET_NOTE_DETAIL_DONE:
      return {
        ...state,
        noteDetail: action.payload,
        getNoteDetailLoading: false,
        getNoteDetailFailed: false,
        getNoteDetailSuccess: true,
      };
    case GET_NOTE_DETAIL_FAILED:
      return {
        ...state,
        noteDetail: {},
        getNoteDetailLoading: false,
        getNoteDetailFailed: true,
        getNoteDetailSuccess: false,
      };
    case GET_NOTE_DETAIL_LOADING:
      return {
        ...state,
        noteDetail: {},
        getNoteDetailLoading: true,
        getNoteDetailFailed: false,
        getNoteDetailSuccess: false,
      };
    //
    case PATCH_NOTE_FAILED:
      return {
        ...state,
        patchNoteLoading: false,
        patchNoteFailed: true,
        patchNoteSuccess: false,
      };
    case PATCH_NOTE_DONE:
      return {
        ...state,
        notes: findAndReplace(state.notes, action.payload),
        noteDetail: {},
        patchNoteLoading: false,
        patchNoteFailed: false,
        patchNoteSuccess: true,
      };
    case PATCH_NOTE_LOADING:
      return {
        ...state,
        patchNoteLoading: true,
        patchNoteFailed: false,
        patchNoteSuccess: false,
      };
    //
    default:
      return state;
  }
}
