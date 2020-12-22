import axios from "axios";
import SERVER_URL from "../url";
import {
  GET_SHARED_NOTES_DONE,
  GET_SHARED_NOTES_LOADING,
  GET_SHARED_NOTES_FAILED,
  GET_SHARED_NOTE_DETAIL_DONE,
  GET_SHARED_NOTE_DETAIL_LOADING,
  GET_SHARED_NOTE_DETAIL_FAILED,
} from "./types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../alerts/messages";

// GET SHARED_NOTES
export const getNotes = () => (dispatch, getState) => {
  // GET ALL SHARED_NOTES
  dispatch({ type: GET_SHARED_NOTES_LOADING });
  axios
    .get(`${SERVER_URL}/notes/shared-with-me/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SHARED_NOTES_DONE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_SHARED_NOTES_FAILED });
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

// GET SHARED_NOTE DETAIL
export const getNoteDetail = (noteId) => (dispatch, getState) => {
  dispatch({ type: GET_SHARED_NOTE_DETAIL_LOADING });
  axios
    .get(`${SERVER_URL}/notes/shared-with-me/${noteId}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SHARED_NOTE_DETAIL_DONE,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({ type: GET_SHARED_NOTE_DETAIL_FAILED });
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
