import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = ({searchCountry, handleSearchCountry}) => {

  return (
    <div>
      find countries <input value={searchCountry} onChange={handleSearchCountry} />
    </div>
  )
}

const Countries = ({filteredCountries, handleShowButton}) => {
  const filteredArr = filteredCountries.map((country, i) => (
    <p key={i}>
      {country.name}
      <button onClick={(event)=>handleShowButton(event, country.name)}>Show</button>
    </p>
  ))

  if(filteredArr.length > 10) return <div>Too many matches, specify another filter</div>
  else if(filteredArr.length === 1) {
    let c = filteredCountries[0]
    let languages = c.languages.map((language, i) => <li key={10 + i}>{language.name}</li>)
    let weather;
    
    axios
      .get(`http://api.weatherstack.com/current?access_key=b263e445ef1bbb1feb09f24e6e186369&query=${c.name}`)
      .then(res => console.log(res))

    return (
      <div>
        <h1>{c.name}</h1>
        <p>capital {c.capital}</p>
        <p>population {c.population}</p>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img src={c.flag} height="100"/>
      </div>
    )
  }

  return (
    <div>
      {filteredArr}
    </div>
  )
}



function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleSearchCountry = event => {
    setSearchCountry(event.target.value)
  }

  const handleShowButton = (event, country) => {
    setSearchCountry(country)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
  
  console.log(filteredCountries)

  return (
    <div>
      <Search searchCountry={searchCountry} handleSearchCountry={handleSearchCountry} />
      <Countries filteredCountries={filteredCountries} handleShowButton={handleShowButton} />
    </div>
  );
}

export default App;
