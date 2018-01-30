import React from 'react';

class App extends React.Component {
    state = {
        persons: [
            { name: 'Arto Hellas' }
        ],
        newName: ''
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
            persons: [
                ...prevState.persons,
                { name: prevState.newName}
            ]
        }))
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        nimi: <input name="newName" onChange={this.handleChange} value={this.state.newName} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.state.persons.map(person => (
                    <div key={person.name}>{person.name}</div>
                ))}
      </div>
        )
    }
}

export default App