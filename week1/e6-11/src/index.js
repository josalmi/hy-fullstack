import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Counter = ({ onIncrement }) => (
    <button type="button" onClick={onIncrement}>+</button>
)

class App extends Component {

    state = {
        counter: 0
    }

    handleIncrement = () => (
        this.setState((prevState) => ({ counter: prevState.counter + 1 }))
    )

    render() {
        return (
            <div>
                <Counter onIncrement={this.handleIncrement} />
                {this.state.counter}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
