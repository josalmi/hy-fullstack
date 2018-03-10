import React from "react";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                store.dispatch({
                  type: "VOTE",
                  id: anecdote.id
                })
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
