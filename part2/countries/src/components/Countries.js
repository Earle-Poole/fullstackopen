import React from 'react'
import Weather from './Weather'

const Countries = ({filteredCountries, handleShowButton, handleWeather, newWeather}) => {
  const filteredArr = filteredCountries.map((country, i) => (
    <p key={i}>
      {country.name}<button onClick={()=>handleShowButton(country.name)}>Show</button>
    </p>
  ))

  if(filteredArr.length > 10) return <div>Too many matches, specify another filter</div>
  else if(filteredArr.length === 1) {
    let country = filteredCountries[0]
    let languages = country.languages.map((language, i) => <li key={i}>{language.name}</li>)
    handleWeather(country.name)
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population.toLocaleString('en')}</p>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img src={country.flag} height="100" alt="" />
        <Weather country={country} newWeather={newWeather}/>
      </div>
    )
  } else if(filteredArr.length === 0) return <div>There are no matches, specify another filter</div>
  return (
    <div>
      {filteredArr}
    </div>
  )
}

export default Countries