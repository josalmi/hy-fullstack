import axios from "axios";

export default function reducer(state = [], action) {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;
    default:
      return state;
  }
}

export function getUsers() {
  return async dispatch => {
    const users = (await axios.get("/api/users")).data;
    dispatch({
      type: "GET_USERS",
      payload: users
    });
  };
}
