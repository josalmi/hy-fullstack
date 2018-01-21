import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ name, onClick }) => (
    <button name={name} onClick={onClick}>{name}</button>
)

const Statistic = ({ name, value }) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

class Statistics extends React.PureComponent {

    countTotal = () => {
        return this.props.feedbackTypes.reduce((prev, { name }) =>
            prev + this.props.counters[name]
        , 0)
    }

    countAverage = (total) => {
        if (total === 0) {
            return 0
        }

        const weightedSum = this.props.feedbackTypes.reduce((prev, { name, value }) => (
            prev + this.props.counters[name] * value
        ), 0)

        return weightedSum / total
    }

    countProportions = (total) => {
        return this.props.feedbackTypes.reduce((proportions, { name }) => ({
            ...proportions,
            [name]: this.props.counters[name] / total || 0
        }), {})
    }

    render() {
        const { counters, feedbackTypes } = this.props
        const total = this.countTotal()
        if (total === 0) {
            return 'ei yhtään palautetta annettu'
        }
        return (
            <table>
                <tbody>
                    {feedbackTypes.map(({ name }) => (
                        <Statistic key={name} name={name} value={counters[name]} />
                    ))}
                    <Statistic name="keskiarvo" value={this.countAverage(total).toFixed(1)} />
                    <Statistic name="positiivisia" value={`${(this.countProportions(total).hyvä * 100).toFixed(1)} %`} />
                </tbody>
            </table>
        )
    }
}

class App extends PureComponent {

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

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                {App.FEEDBACK_TYPES.map(({ name }) => (
                    <Button key={name} name={name} onClick={this.handleIncrement} />
                ))}
                <h1>statistiikka</h1>
                <Statistics counters={this.state} feedbackTypes={App.FEEDBACK_TYPES} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
