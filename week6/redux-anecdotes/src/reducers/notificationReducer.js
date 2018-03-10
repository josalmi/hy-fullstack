const initialState = {
  message: "I heard you like notifications"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case "SHOW_NOTIFICATION":
    return {
      ...state,
      message: action.message
    };
  case "CLEAR_NOTIFICATION":
    return {
      ...state,
      message: null
    };
  default:
    return state;
  }
};

export default reducer;

export const notify = (message, timeout) => dispatch => {
  dispatch({
    type: "SHOW_NOTIFICATION",
    message
  });
  setTimeout(
    () =>
      dispatch({
        type: "CLEAR_NOTIFICATION"
      }),
    timeout
  );
};
