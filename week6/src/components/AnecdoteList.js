import React from "react";
import { connect } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = ({ anecdotes, updateAnecdote, notify }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={async () => {
                await updateAnecdote(anecdote.id, {
                  votes: anecdote.votes + 1
                });
                notify(`you voted '${anecdote.content}'`, 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(
  ({ anecdotes, filter }) => {
    const anecdotesToShow = anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
    return {
      anecdotes: anecdotesToShow
    };
  },
  {
    updateAnecdote,
    notify
  }
)(AnecdoteList);
