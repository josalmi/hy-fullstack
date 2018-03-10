import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification
} from "../reducers/notificationReducer";

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.createAnecdote(content);
    this.props.showNotification(`you added '${content}'`);
    setTimeout(() => {
      this.props.hideNotification();
    }, 5000);

    e.target.anecdote.value = "";
  };

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  createAnecdote,
  showNotification,
  hideNotification
})(AnecdoteForm);
