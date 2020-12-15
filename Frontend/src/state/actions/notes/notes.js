import axios from "axios";
import SERVER_URL from "../url";
import {
  ADD_NOTE_DONE,
  ADD_NOTE_LOADING,
  ADD_NOTE_FAILED,
  PATCH_NOTE_DONE,
  PATCH_NOTE_LOADING,
  PATCH_NOTE_FAILED,
  GET_NOTES_DONE,
  GET_NOTES_LOADING,
  GET_NOTES_FAILED,
  GET_NOTE_DETAIL_DONE,
  GET_NOTE_DETAIL_LOADING,
  GET_NOTE_DETAIL_FAILED,
} from "./types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../alerts/messages";

// ADD NOTE
export const addNote = (noteData) => (dispatch, getState) => {
  dispatch({ type: ADD_NOTE_LOADING });
  axios
    .post(`${SERVER_URL}/api/v1/notes/`, noteData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_NOTE_DONE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: ADD_NOTE_FAILED });
      // TODO: Add Error Handling
      if (typeof err.response === "undefined") {
        return dispatch(
          returnErrors("Something went wrong", null, "Adding Note Failed")
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Adding Note Failed"
          )
        );
      }
    });
};

// GET NOTES
export const getNotes = () => (dispatch, getState) => {
  // GET ALL NOTES
  dispatch({ type: GET_NOTES_LOADING });
  axios
    .get(`${SERVER_URL}/api/v1/notes/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NOTES_DONE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_NOTES_FAILED });
      // TODO: Add Error Handling
      if (typeof err.response === "undefined") {
        return dispatch(
          returnErrors("Something went wrong", null, "Get Notes Failed")
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Get Notes Failed"
          )
        );
      }
    });
};

// GET NOTE DETAIL
export const getNoteDetail = (noteId) => (dispatch, getState) => {
  dispatch({ type: GET_NOTE_DETAIL_LOADING });
  axios
    .get(`${SERVER_URL}/api/v1/notes/${noteId}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NOTE_DETAIL_DONE,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({ type: GET_NOTE_DETAIL_FAILED });
      // TODO: Add Error Handling
      if (typeof err.response === "undefined") {
        return dispatch(
          returnErrors("Something went wrong", null, "Get Note Detail Failed")
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Get Note Detail Failed"
          )
        );
      }
    });
};

// PATCH NOTE
export const patchNote = (noteId, noteData) => (dispatch, getState) => {
  dispatch({ type: PATCH_NOTE_LOADING });
  axios
    .patch(
      `${SERVER_URL}/api/v1/notes/${noteId}/`,
      noteData,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PATCH_NOTE_DONE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: PATCH_NOTE_FAILED });
      if (typeof err.response === "undefined") {
        return dispatch(
          returnErrors("Something went wrong", null, "Editing Note Failed")
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Editing Note Failed"
          )
        );
      }
    });
};
