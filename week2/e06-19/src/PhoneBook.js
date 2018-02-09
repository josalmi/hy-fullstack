import React from 'react'

const PhoneBookEntry = ({ id, name, number, onDelete }) => (
    <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button type="button" onClick={onDelete} value={id}>Delete</button></td>
    </tr>
)

const PhoneBook = ({ persons, onDelete }) => (
    <div>
        <h2>Numerot</h2>
        <table>
            <tbody>
                {persons
                    .map(person => (
                        <PhoneBookEntry key={person.name} id={person.id} name={person.name} number={person.number} onDelete={onDelete} />
                    ))
                }
            </tbody>
        </table>
    </div>
)

export default PhoneBook