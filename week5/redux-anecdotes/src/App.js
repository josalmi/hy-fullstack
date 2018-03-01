import React from "react";

class App extends React.Component {
  render() {
    const anecdotes = this.props.store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() =>
                  this.props.store.dispatch({
                    type: "VOTE",
                    anecdote: anecdote.id
                  })
                }
              >
                vote
              </button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.store.dispatch({
              type: "ADD",
              anecdote: this.i.value
            });
          }}
        >
          <div>
            <input ref={input => (this.i = input)} />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default App;
