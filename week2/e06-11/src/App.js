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
        const existingPerson = this.state.persons.find(person => person.name === this.state.newName)
        if (existingPerson === undefined) {
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
        } else if (window.confirm(`${existingPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
            const updatedPerson = await personService.update(existingPerson.id, { number: this.state.newNumber })
            this.setState(prevState => ({
                ...prevState,
                newName: '',
                newNumber: '',
                persons: prevState.persons.map(person =>
                    person.id === updatedPerson.id
                    ? updatedPerson
                    : person
                )
            }))
        }
    }

    handleDelete = async ({ target: { value } }) => {
        const id = parseInt(value, 10)
        if (window.confirm(`poistetaanko ${this.state.persons.find(person => person.id === id).name}`)) {
            await personService.remove(id)
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