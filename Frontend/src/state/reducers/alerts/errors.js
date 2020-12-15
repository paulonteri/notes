import { GET_ERRORS } from "../../actions/alerts/types";

const initialState = {
  msg: {},
  status: {},
  title: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        title: action.payload.title,
      };
    default:
      return state;
  }
}
