import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi}</h1>
)

const Osa = ({ osa, tehtavia }) => (
    <p>{osa} {tehtavia}</p>
)

const Sisalto = ({ osa1, osa2, osa3 }) => (
    <Fragment>
        <Osa osa={osa1.nimi} tehtavia={osa1.tehtavia} />
        <Osa osa={osa2.nimi} tehtavia={osa2.tehtavia} />
        <Osa osa={osa3.nimi} tehtavia={osa3.tehtavia} />
    </Fragment>
)

const Yhteensa = ({ osa1: { tehtavia: tehtavia1 }, osa2: { tehtavia: tehtavia2 }, osa3: { tehtavia: tehtavia3 } }) => (
    <p>yhteensä {tehtavia1 + tehtavia2 + tehtavia3} tehtävää</p>
)

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto {...{osa1, osa2, osa3}} />
      <Yhteensa {...{osa1, osa2, osa3}} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)