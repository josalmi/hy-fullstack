import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi}</h1>
)

const Osa = ({ osa, tehtavia }) => (
    <p>{osa} {tehtavia}</p>
)

const Sisalto = ({ osa1, tehtavia1, osa2, tehtavia2, osa3, tehtavia3}) => (
    <Fragment>
        <Osa osa={osa1} tehtavia={tehtavia1} />
        <Osa osa={osa2} tehtavia={tehtavia2} />
        <Osa osa={osa3} tehtavia={tehtavia3} />
    </Fragment>
)

const Yhteensa = ({ tehtavia1, tehtavia2, tehtavia3 }) => (
    <p>yhteensä {tehtavia1 + tehtavia2 + tehtavia3} tehtävää</p>
)

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto {...{osa1, tehtavia1, osa2, tehtavia2, osa3, tehtavia3}} />
      <Yhteensa {...{tehtavia1, tehtavia2, tehtavia3}} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)