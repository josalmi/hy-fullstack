import React from 'react';

class App extends React.Component {
    state = {
        persons: [
            { name: 'Arto Hellas', number: '040-123456' },
            { name: 'Martti Tienari', number: '040-123456' },
            { name: 'Arto Järvinen', number: '040-123456' },
            { name: 'Lea Kutvonen', number: '040-123456' }
        ],
        newName: '',
        newNumber: '',
        filter: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.persons.some(person => person.name === this.state.newName)) {
            return
        }
        this.setState(prevState => ({
            ...prevState,
            newName: '',
            newNumber: '',
            persons: [
                ...prevState.persons,
                { name: prevState.newName, number: prevState.newNumber }
            ]
        }))
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    rajaa näytettäviä <input name="filter" type="search" onChange={this.handleChange} value={this.state.filter} />
                </div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        nimi: <input name="newName" onChange={this.handleChange} value={this.state.newName} />
                    </div>
                    <div>
                        numero: <input name="newNumber" onChange={this.handleChange} value={this.state.newNumber} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {this.state.persons
                            .filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
                            .map(person => (
                                <tr key={person.name}>
                                    <td>{person.name}</td>
                                    <td>{person.number}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
      </div>
        )
    }
}

export default App