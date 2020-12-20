import { combineReducers } from "redux";
import errors from "./alerts/errors";
import messages from "./alerts/messages";
import auth from "./auth/auth";
import notes from "./notes/notes";
import users from "./users/users";

export default combineReducers({
  authReducer: auth,
  usersReducer: users,
  notesReducer: notes,
  errorsReducer: errors,
  messagesReducer: messages,
});
