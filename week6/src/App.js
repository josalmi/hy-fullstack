import React from "react";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => (
  <div>
    <h1>Programming anecdotes</h1>
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
);

export default App;
