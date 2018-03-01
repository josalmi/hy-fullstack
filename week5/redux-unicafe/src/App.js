import React from "react";
import { connect } from "react-redux";
import {
  goodCounter,
  badCounter,
  okCounter,
  zeroCounter
} from "./ducks/counter";

const Statistiikka = ({ good, ok, bad, reset }) => {
  const palautteita = good + ok + bad;

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{good / (palautteita - ok)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{good + ok}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={reset}>nollaa tilasto</button>
    </div>
  );
};

class App extends React.Component {
  klik = nappi => () => {};

  render() {
    const { good, ok, bad } = this.props;
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.props.goodCounter}>hyvä</button>
        <button onClick={this.props.okCounter}>neutraali</button>
        <button onClick={this.props.badCounter}>huono</button>
        <Statistiikka
          good={good}
          ok={ok}
          bad={bad}
          reset={this.props.zeroCounter}
        />
      </div>
    );
  }
}

export default connect(state => state.counter, {
  goodCounter,
  badCounter,
  okCounter,
  zeroCounter
})(App);
