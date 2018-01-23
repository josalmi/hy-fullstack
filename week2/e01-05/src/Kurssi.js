import React from 'react'

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

export default Kurssi;