import { combineReducers } from "redux";
import errors from "./alerts/errors";
import messages from "./alerts/messages";
import auth from "./auth/auth";

export default combineReducers({
  authReducer: auth,
  errorsReducer: errors,
  messagesReducer: messages,
});
