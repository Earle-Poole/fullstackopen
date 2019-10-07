import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Countries from './components/Countries'
import Search from './components/Search'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('swi')
  const [weather, setWeather] = useState()
  const [newWeather, setNewWeather] = useState()

  const handleSearchCountry = event => {
    setSearchCountry(event.target.value)
  }

  const handleShowButton = country => {
    setSearchCountry(country)
  }

  const handleWeather = res => {
    setWeather(res)
  }

  useEffect(() => {
    if(weather)
    axios
      .get(`http://api.weatherstack.com/current?access_key=b263e445ef1bbb1feb09f24e6e186369&query=${weather}`)
      .then(res => {
        const { temperature, weather_icons, wind_speed, wind_dir } = res.data.current 
        const weatherObj = {
          temperature: temperature,
          url: weather_icons[0],
          windSpeed: wind_speed,
          windDirection: wind_dir
        }
        setNewWeather(weatherObj)
      })
  }, [weather])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
  
  return (
    <div>
      <Search searchCountry={searchCountry} handleSearchCountry={handleSearchCountry} />
      <Countries filteredCountries={filteredCountries} handleShowButton={handleShowButton} handleWeather={handleWeather} newWeather={newWeather} />
    </div>
  );
}

export default App;
