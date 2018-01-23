import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi}</h1>
)

const Osa = ({ osa, tehtavia }) => (
    <p>{osa} {tehtavia}</p>
)

const Sisalto = ({ osat }) => (
    osat.map(osa => (
        <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />
    ))
)

const Yhteensa = ({ osat }) => (
    <p>yhteensä {osat.map(osa => osa.tehtavia).reduce((p, n) => p + n)} tehtävää</p>
)

const Kurssi = ({ kurssi }) => (
    <div>
        <Otsikko kurssi={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
        <Yhteensa osat={kurssi.osat} />
    </div>
)

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)