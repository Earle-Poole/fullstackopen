import React from 'react'

const Weather = ({country, newWeather}) => {
  if(newWeather){
  return (
    <div>
      <h2>Weather in {country.name}</h2>
      <p><strong>temperature: </strong> {newWeather.temperature} Celsius</p>
      <img src={newWeather.url} alt={country.name} />
      <p><strong>wind: </strong> {newWeather.windSpeed} kph direction {newWeather.windDirection}</p>
    </div>
  )}
  return null;
}

export default Weather