import React from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PhoneBook from './PhoneBook'

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
        const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter name="filter" values={this.state} onChange={this.handleChange} />
                <PersonForm  values={this.state} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                <PhoneBook persons={filteredPersons} />
            </div>
        )
    }
}

export default App