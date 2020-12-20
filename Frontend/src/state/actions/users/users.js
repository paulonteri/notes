import axios from "axios";
import URL from "../url";
import {
  GET_USERS_FAILED,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_LOADING,
  PATCH_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_USER_LOADING,
  ADD_USER_SUCCESS,
} from "./types";
import { createMessage, returnErrors } from "../alerts/messages";
import { tokenConfig } from "../auth/auth";

export const getUsers = () => (dispatch, getState) => {
  // GET ALL USERS
  dispatch({ type: GET_USERS_LOADING });
  axios
    .get(`${URL}/api/v1/auth/users/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_USERS_FAILED });
      if (typeof err.response === "undefined") {
        return dispatch(
          createMessage({
            undefinedErrMsg: ".",
          })
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Getting Users Failed"
          )
        );
      }
    });
};

export const addUser = (user) => (dispatch, getState) => {
  // SAVE USER
  dispatch({ type: ADD_USER_LOADING });

  axios
    .post(`${URL}/api/v1/auth/users/`, user, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ success: "User Saved" }));
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: ADD_USER_FAILED });
      if (typeof err.response === "undefined") {
        return dispatch(
          createMessage({
            undefinedErrMsg: ".",
          })
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Adding User Failed"
          )
        );
      }
    });
};

export const patchUser = (id, user) => (dispatch, getState) => {
  // PATCH USER
  dispatch({ type: PATCH_USER_LOADING });
  axios
    .patch(`${URL}/api/v1/auth/users/${id}/`, user, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ success: "User Updated" }));
      dispatch({
        type: PATCH_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: PATCH_USER_FAILED });
      if (typeof err.response === "undefined") {
        return dispatch(
          createMessage({
            undefinedErrMsg: ".",
          })
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Editing User Failed"
          )
        );
      }
    });
};

export const deleteUser = (id) => (dispatch, getState) => {
  // DELETE USER
  dispatch({ type: DELETE_USER_LOADING });
  axios
    .delete(`${URL}/api/v1/auth/users/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ success: "User Deleted" }));
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch({ type: DELETE_USER_FAILED });
      if (typeof err.response === "undefined") {
        return dispatch(
          createMessage({
            undefinedErrMsg: ".",
          })
        );
      } else {
        return dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "Deleting User Failed"
          )
        );
      }
    });
};
