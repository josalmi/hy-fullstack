import React from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PhoneBook from './PhoneBook'

const api = axios.create({
    baseURL: 'http://localhost:3001'
})

class App extends React.Component {
    state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: ''
    }

    async componentWillMount() {
        const { data: persons } = await api.get('/persons')
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
        const { data } = await api.post('/persons', { name: this.state.newName, number: this.state.newNumber })
        this.setState(prevState => ({
            ...prevState,
            newName: '',
            newNumber: '',
            persons: [
                ...prevState.persons,
                data
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