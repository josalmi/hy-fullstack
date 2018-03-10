import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification
} from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={store} />
      {anecdotes
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  store.dispatch(voteAnecdote(anecdote.id));
                  store.dispatch(
                    showNotification(`you voted '${anecdote.content}'`)
                  );
                  setTimeout(() => {
                    store.dispatch(hideNotification());
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

export default AnecdoteList;
