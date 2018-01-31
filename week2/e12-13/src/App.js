import React from 'react';

class App extends React.Component {

  state = {
    filter: '',
    countries: []
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value })
  }

  async componentWillMount() {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await response.json()
    this.setState({ countries })
  }

  render() {
    const countriesToShow = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        find countries: <input name="filter" value={this.state.filter} onChange={this.handleChange} />
        <div>
          {
            countriesToShow.length > 10
            ? 'too many matches, specify another filter'
            : countriesToShow.length > 1
            ? countriesToShow.map(country => (
                <div key={country.name}>{country.name}</div>
              ))
            : countriesToShow.length === 1
            ? countriesToShow.map(country => (
                <div>
                  <h2>{country.name}</h2>
                  <div>capital: {country.capital}</div>
                  <div>population: {country.population}</div>
                  <img alt={`${country.name} flag`} src={country.flag} width="200" />
                </div>
              ))
            : 'no matches'
          }
        </div>
      </div>
    );
  }
}

export default App;
