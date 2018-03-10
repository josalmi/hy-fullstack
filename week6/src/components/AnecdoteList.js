import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => store.dispatch(voteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
