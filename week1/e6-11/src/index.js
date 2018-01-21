import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Counter = ({ name, onIncrement }) => (
    <button name={name} onClick={onIncrement}>{name}</button>
)

class App extends Component {

    static FEEDBACK_TYPES = [
        {
            name: 'hyvä',
            value: 1
        },
        {
            name: 'neutraali',
            value: 0
        },
        {
            name: 'huono',
            value: -1
        }
    ]

    state = App.FEEDBACK_TYPES.reduce((state, { name }) => ({
        ...state,
        [name]: 0
    }), {})

    handleIncrement = ({ target: { name }}) => (
        this.setState((prevState) => ({ [name]: prevState[name] + 1 }))
    )

    countTotal = () => {
        return App.FEEDBACK_TYPES.reduce((prev, { name }) =>
            prev + this.state[name]
        , 0)
    }

    countAverage = () => {
        const total = this.countTotal()
        if (total === 0) {
            return 0
        }

        const weightedSum = App.FEEDBACK_TYPES.reduce((prev, { name, value }) => (
            prev + this.state[name] * value
        ), 0)

        return weightedSum / total
    }

    countProportions = () => {
        const total = this.countTotal()
        return App.FEEDBACK_TYPES.reduce((proportions, { name }) => ({
            ...proportions,
            [name]: this.state[name] / total || 0
        }), {})
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                {App.FEEDBACK_TYPES.map(({ name }) => (
                    <Counter name={name} onIncrement={this.handleIncrement} />
                ))}
                <h1>statistiikka</h1>
                {App.FEEDBACK_TYPES.map(({ name }) => (
                    <div>{name} {this.state[name]}</div>
                ))}
                <div>keskiarvo: {this.countAverage().toFixed(1)}</div>
                <div>positiivisia: {(this.countProportions().hyvä * 100).toFixed(1)} %</div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
