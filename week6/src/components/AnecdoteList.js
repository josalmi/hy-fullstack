import React from "react";
import { connect } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification
} from "../reducers/notificationReducer";
import Filter from "./Filter";
import anecdoteService from "../services/anecdoteService";

const AnecdoteList = ({
  anecdotes,
  updateAnecdote,
  showNotification,
  hideNotification
}) => {
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
                const updatedAnecdote = await anecdoteService.patch(
                  anecdote.id,
                  { votes: anecdote.votes + 1 }
                );
                updateAnecdote(updatedAnecdote);
                showNotification(`you voted '${anecdote.content}'`);
                setTimeout(() => {
                  hideNotification();
                }, 5000);
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
    showNotification,
    hideNotification
  }
)(AnecdoteList);
