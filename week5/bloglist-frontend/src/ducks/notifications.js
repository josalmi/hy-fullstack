export default function reducer(state = { notifications: [] }, action) {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          message => message !== action.payload
        )
      };
    default:
      return state;
  }
}

export function notify(message, timeout) {
  return dispatch => {
    dispatch({
      type: "CREATE_NOTIFICATION",
      payload: message
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: message
      });
    }, timeout);
  };
}
