import React from "react";
import { connect } from "react-redux";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { fetchAnecdotes } from "./services/anecdoteService";
import { getAnecdotes } from "./reducers/anecdoteReducer";

class App extends React.PureComponent {
  async componentDidMount() {
    const anecdotes = await fetchAnecdotes();
    this.props.getAnecdotes(anecdotes);
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
