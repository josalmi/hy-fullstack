import React from 'react'
import personService from './personService'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PhoneBook from './PhoneBook'

class App extends React.Component {
    state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: ''
    }

    async componentWillMount() {
        const persons = await personService.getAll()
        this.setState({ persons })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.persons.some(person => person.name === this.state.newName)) {
            return
        }
        const newPerson = await personService.create({ name: this.state.newName, number: this.state.newNumber })
        this.setState(prevState => ({
            ...prevState,
            newName: '',
            newNumber: '',
            persons: [
                ...prevState.persons,
                newPerson
            ]
        }))
    }

    handleDelete = async ({ target: { value } }) => {
        const id = parseInt(value)
        if (window.confirm(`poistetaanko ${this.state.persons.find(person => person.id === id).name}`)) {
            const result = await personService.remove(id)
            this.setState(prevState => ({
                ...prevState,
                persons: prevState.persons.filter(person => person.id !== id)
            }))
        }
    }

    render() {
        const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter name="filter" values={this.state} onChange={this.handleChange} />
                <PersonForm  values={this.state} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                <PhoneBook persons={filteredPersons} onDelete={this.handleDelete} />
            </div>
        )
    }
}

export default App