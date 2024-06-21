import React, { useState } from 'react';
import axios from 'axios';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const apiKey = process.env.WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <CitySearch onSearch={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;
