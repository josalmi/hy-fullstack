import anecdoteService from "../services/anecdoteService";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case "UPDATE_ANECDOTE":
    return state.map(
      anecdote =>
        anecdote.id === action.anecdote.id ? action.anecdote : anecdote
    );
  case "CREATE":
    return [...state, action.anecdote];
  case "GET_ANECDOTES":
    return action.anecdotes;
  default:
    return state;
  }
};

export default reducer;

export const createAnecdote = anecdote => {
  return {
    type: "CREATE",
    anecdote
  };
};

export const updateAnecdote = anecdote => {
  return {
    type: "UPDATE_ANECDOTE",
    anecdote
  };
};

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "GET_ANECDOTES",
      anecdotes
    });
  };
};
