import axios from "axios";

import { notify } from "./notifications";

export default function reducer(
  state = { form: { username: "", password: "" } },
  action
) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    case "SESSION_INPUT_CHANGE":
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value
        }
      };
    default:
      return state;
  }
}

export function login(credentials) {
  return async dispatch => {
    try {
      const user = (await axios.post("/api/login", credentials)).data;
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: user
      });
    } catch (e) {
      notify(e.message, 5000)(dispatch);
    }
  };
}

export function sessionFormInputChange(e) {
  return {
    type: "SESSION_INPUT_CHANGE",
    payload: {
      name: e.target.name,
      value: e.target.value
    }
  };
}

export function logout() {
  window.localStorage.clear();
  return {
    type: "LOGOUT"
  };
}
