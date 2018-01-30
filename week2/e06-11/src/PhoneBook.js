import React from 'react'

const PhoneBookEntry = ({ name, number }) => (
    <tr key={name}>
        <td>{name}</td>
        <td>{number}</td>
    </tr>
)

const PhoneBook = ({ persons }) => (
    <div>
        <h2>Numerot</h2>
        <table>
            <tbody>
                {persons
                    .map(person => (
                        <PhoneBookEntry key={person.name} name={person.name} number={person.number} />
                    ))
                }
            </tbody>
        </table>
    </div>
)

export default PhoneBook