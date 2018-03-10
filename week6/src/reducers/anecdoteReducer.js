const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case "VOTE":
    return state.map(
      anecdote =>
        anecdote.id === action.id
          ? {
            ...anecdote,
            votes: anecdote.votes + 1
          }
          : anecdote
    );
  case "CREATE":
    return [...state, action.anecdote];
  case "GET_ANECDOTES":
    return action.anecdotes;
  }
  return state;
};

export default reducer;

export const createAnecdote = anecdote => {
  return {
    type: "CREATE",
    anecdote
  };
};

export const voteAnecdote = id => {
  return {
    type: "VOTE",
    id
  };
};

export const getAnecdotes = anecdotes => {
  return {
    type: "GET_ANECDOTES",
    anecdotes
  };
};
