import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h2>{kurssi}</h2>
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
    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
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
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {kurssit.map(kurssi => (
                <Kurssi key={kurssi.id} kurssi={kurssi} />
            ))}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)