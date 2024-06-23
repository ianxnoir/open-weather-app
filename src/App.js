import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log('Environment Variable:', process.env.REACT_APP_WEATHER_API_KEY);
    fetchUserData();
  }, []);

  const fetchWeather = async (city) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('API key is undefined');
      }

      let url = '';
      if (city.id) {
        url = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=${apiKey}`;
      } else {
        const query = city.name.split(',').map(part => part.trim()).join(',');
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
      }

      const response = await axios.get(url);
      setWeatherData(response.data);
      saveUserData({ city: city.name, weatherData: response.data });
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  const saveUserData = async (data) => {
    try {
      await axios.post('/api/userdata', data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/userdata');
      setUserData(response.data); 
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <CitySearch onSearch={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} />
      {userData && (
        <div className="previous-searches">
          <h2>Previous Searches</h2>
          <ul>
            {userData.map((data, index) => (
              <li key={index}>{data.city}: {data.weatherData.main.temp}°C</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
