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
  case "HIDE_NOTIFICATION":
    return {
      ...state,
      message: null
    };
  default:
    return state;
  }
};

export default reducer;

export const showNotification = message => {
  return {
    type: "SHOW_NOTIFICATION",
    message
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION"
  };
};
