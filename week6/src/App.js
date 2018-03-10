import React from "react";
import { connect } from "react-redux";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { getAnecdotes } from "./reducers/anecdoteReducer";

class App extends React.PureComponent {
  componentDidMount() {
    this.props.getAnecdotes();
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    );
  }
}

export default connect(null, {
  getAnecdotes
})(App);
