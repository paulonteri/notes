import {
  GET_USERS_FAILED,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  ADD_USER_FAILED,
  ADD_USER_LOADING,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_LOADING,
  PATCH_USER_SUCCESS,
} from "../../actions/users/types";

import { findAndReplace, deleteObject } from "../../algorithms";

const initialState = {
  users: [],
  getUsersLoading: false,
  getUsersFailed: false,
  addUsersLoading: false,
  addUsersFailed: false,
  patchingUsers: false,
  patchingUsersFailed: false,
  patchedUsers: false,
  deletingUsers: false,
  deletingUsersFailed: false,
  deletedUsers: false,
  uploadUserLoading: false,
  uploadUserFailed: false,
  uploadUserSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        getUsersLoading: false,
        getUsersFailed: false,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        getUsersLoading: false,
        getUsersFailed: true,
      };
    case GET_USERS_LOADING:
      return {
        ...state,
        getUsersLoading: true,
        getUsersFailed: false,
      };
    //
    case ADD_USER_LOADING:
      return {
        ...state,
        uploadUserLoading: true,
        uploadUserSuccess: false,
        uploadUserFailed: false,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        uploadUserLoading: false,
        uploadUserFailed: false,
        uploadUserSuccess: true,
      };
    case ADD_USER_FAILED:
      return {
        ...state,
        uploadUserFailed: true,
        uploadUserLoading: false,
        uploadUserSuccess: false,
      };
    //
    case DELETE_USER_LOADING:
      return {
        ...state,
        deletingUsers: true,
        deletedUsers: false,
        deletingUsersFailed: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: deleteObject(state.users, action.payload),
        deletingUsers: false,
        deletingUsersFailed: false,
        deletedUsers: true,
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        deletingUsersFailed: true,
        deletingUsers: false,
        deletedUsers: false,
      };
    //
    //
    case PATCH_USER_LOADING:
      return {
        ...state,
        patchingUsers: true,
        patchedUsers: false,
        patchingUsersFailed: false,
      };
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        users: findAndReplace(state.users, action.payload),
        patchingUsers: false,
        patchingUsersFailed: false,
        patchedUsers: true,
      };
    case PATCH_USER_FAILED:
      return {
        ...state,
        patchingUsersFailed: true,
        patchingUsers: false,
        patchedUsers: false,
      };
    //

    default:
      return state;
  }
}
