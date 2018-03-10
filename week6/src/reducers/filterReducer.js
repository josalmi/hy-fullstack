const reducer = (state = "", action) => {
  switch (action.type) {
  case "CHANGE_FILTER":
    return action.value;
  }
  return state;
};

export default reducer;

export const changeFilter = value => {
  return {
    type: "CHANGE_FILTER",
    value
  };
};
