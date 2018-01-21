import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <div>{anecdote}</div>
    <div>has {votes || 0} votes</div>
  </div>
)

class App extends React.Component {
  state = {
    selected: 0,
    votes: {}
  }

  vote = () => {
    this.setState(prevState => ({
      votes: {
        ...prevState.votes,
        [prevState.selected]: (prevState.votes[prevState.selected] || 0) + 1
      }
    }))
  }

  nextAnecdote = () => {
    this.setState({ selected: Math.floor(Math.random()*anecdotes.length) })
  }

  mostVotedIndex = () => {
    return Object.keys(this.state.votes).reduce((best, index) => (
      this.state.votes[index] > best.value
        ? { index, value: this.state.votes[index] }
        : best
    ), { index: 0, value: -Infinity })
    .index
  }

  render() {
    const mostVotedIndex = this.mostVotedIndex()
    return (
      <div>
        <Anecdote
          anecdote={this.props.anecdotes[this.state.selected]}
          votes={this.state.votes[this.state.selected]}
          />
        <div>
          <button onClick={this.vote}>vote</button>
          <button onClick={this.nextAnecdote}>next anecdote</button>
        </div>
        <h2>anecdote with most votes</h2>
        <Anecdote
          anecdote={this.props.anecdotes[mostVotedIndex]}
          votes={this.state.votes[mostVotedIndex]}
          />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)