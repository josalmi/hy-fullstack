import anecdoteService from "../services/anecdoteService";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case "UPDATE_ANECDOTE":
    return state.map(
      anecdote =>
        anecdote.id === action.anecdote.id ? action.anecdote : anecdote
    );
  case "CREATE_ANECDOTE":
    return [...state, action.anecdote];
  case "GET_ANECDOTES":
    return action.anecdotes;
  default:
    return state;
  }
};

export default reducer;

export const createAnecdote = anecdote => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.create(anecdote);
    dispatch({
      type: "CREATE_ANECDOTE",
      anecdote: createdAnecdote
    });
  };
};

export const updateAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.patch(id, anecdote);
    dispatch({
      type: "UPDATE_ANECDOTE",
      anecdote: updatedAnecdote
    });
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
