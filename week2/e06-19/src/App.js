import React from "react";
import personService from "./personService";
import Notification from "./Notification";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import PhoneBook from "./PhoneBook";

class App extends React.Component {
  state = {
    persons: [],
    newName: "",
    newNumber: "",
    filter: "",
    message: null,
    error: false
  };

  async componentWillMount() {
    const persons = await personService.getAll();
    this.setState({ persons });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const existingPerson = this.state.persons.find(
      person => person.name === this.state.newName
    );
    if (existingPerson === undefined) {
      const newPerson = await personService.create({
        name: this.state.newName,
        number: this.state.newNumber
      });
      this.setState(prevState => ({
        newName: "",
        newNumber: "",
        persons: [...prevState.persons, newPerson]
      }));
      this.showNotification(`lisättiin ${newPerson.name}`);
    } else if (
      window.confirm(
        `${
          existingPerson.name
        } on jo luettelossa, korvataanko vanha numero uudella?`
      )
    ) {
      let updatedPerson;
      try {
        updatedPerson = await personService.update(existingPerson.id, {
          number: this.state.newNumber
        });
      } catch (e) {
        if (e.response.status !== 404) {
          throw e;
        }
        // fallback to creating new person
        updatedPerson = await personService.create({
          name: this.state.newName,
          number: this.state.newNumber
        });
      }
      this.setState(prevState => ({
        newName: "",
        newNumber: "",
        persons: prevState.persons.map(
          person => (person.id === updatedPerson.id ? updatedPerson : person)
        )
      }));
      this.showNotification(`päivitettiin ${existingPerson.name}`);
    }
  };

  handleDelete = async ({ target: { value } }) => {
    const personToDelete = this.state.persons.find(
      person => person.id === value
    );
    if (window.confirm(`poistetaanko ${personToDelete.name}`)) {
      try {
        await personService.remove(personToDelete.id);
      } catch (e) {
        if (e.response.status !== 404) {
          throw e;
        }
      }
      this.setState(prevState => ({
        persons: prevState.persons.filter(person => person !== personToDelete)
      }));
      this.showNotification(`postettiin ${personToDelete.name}`);
    }
  };

  showNotification = (message, error = false) => {
    this.setState({
      message,
      error
    });
    setTimeout(() => this.setState({ message: null }), 5000);
  };

  render() {
    const filteredPersons = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message} error={this.state.error} />
        <Filter
          name="filter"
          values={this.state}
          onChange={this.handleChange}
        />
        <PersonForm
          values={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <PhoneBook persons={filteredPersons} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
