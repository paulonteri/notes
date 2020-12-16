import { combineReducers } from "redux";
import errors from "./alerts/errors";
import messages from "./alerts/messages";
import auth from "./auth/auth";
import notes from "./notes/notes";

export default combineReducers({
  authReducer: auth,
  notesReducer: notes,
  errorsReducer: errors,
  messagesReducer: messages,
});
