import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Counter = ({ name, onIncrement }) => (
    <button name={name} onClick={onIncrement}>{name}</button>
)

class App extends Component {

    static FEEDBACK_TYPES = ['hyvä', 'neutraali', 'huono']

    state = App.FEEDBACK_TYPES.reduce((state, type) => ({
        ...state,
        [type]: 0
    }), {});

    handleIncrement = ({ target: { name }}) => (
        this.setState((prevState) => ({ [name]: prevState[name] + 1 }))
    )

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                {App.FEEDBACK_TYPES.map(type => (
                    <Counter name={type} onIncrement={this.handleIncrement} />
                ))}
                <h1>statistiikka</h1>
                {App.FEEDBACK_TYPES.map(type => (
                    <div>{type} {this.state[type]}</div>
                ))}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
