import { combineReducers } from "redux";
import errors from "./alerts/errors";
import messages from "./alerts/messages";
import auth from "./auth/auth";
import notes from "./notes/notes";
import sharedNotes from "./sharedNotes/sharedNotes";
import users from "./users/users";

export default combineReducers({
  authReducer: auth,
  usersReducer: users,
  sharedNotesReducer: sharedNotes,
  notesReducer: notes,
  errorsReducer: errors,
  messagesReducer: messages,
});
