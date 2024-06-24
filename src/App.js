import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import { categoryBackgrounds, getWeatherCategory } from './weatherConstants';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveRecentSearch = useCallback((city, weather) => {
    setRecentSearches((prevSearches) => {
      let searches = [...prevSearches];
      if (!searches.some(search => search.name === city.name)) {
        const searchItem = {
          name: city.name,
          temperature: weather.main.temp,
          icon: weather.weather[0].icon,
          condition: weather.weather[0].id
        };
        searches = [searchItem, ...searches].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        return searches;
      }
      return prevSearches;
    });
  }, []);

  const fetchWeather = useCallback(async (city, isUserInitiated = true) => {
    try {
      setLoading(true);
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('API key is undefined');
      }

      const query = city.name.split(',').map(part => part.trim()).join(',');
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
      
      const response = await axios.get(url);
      setWeatherData(response.data);

      if (isUserInitiated) {
        saveRecentSearch(city, response.data);
      }
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    } finally {
      setLoading(false);
    }
  }, [saveRecentSearch]);

  const fetchWeatherByCoordinates = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const cityData = {
        name: `${response.data.name}, ${response.data.sys.country}`,
        id: response.data.id,
      };
      fetchWeather(cityData, false);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchWeather]);

  const handleRecentSearchClick = (city) => {
    fetchWeather(city);
  };

  const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}.png`;

  const getWeatherBackground = (conditionCode) => {
    const category = getWeatherCategory(conditionCode);
    return categoryBackgrounds[category];
  };

  useEffect(() => {
    localStorage.clear();

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        }, (error) => {
          console.error('Error getting location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    
    getUserLocation();
  }, [fetchWeatherByCoordinates]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <CitySearch onSearch={fetchWeather} />
      {loading && <img className="loading-spinner" src="/images/loading.gif" alt="Loading..." />}
      {!loading && weatherData && <WeatherDisplay weatherData={weatherData} />}
      {recentSearches.length > 0 && !loading && (
        <div className="recent-searches">
          <h2>Recent Searches</h2>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} style={{ backgroundImage: `url(${getWeatherBackground(search.condition)})` }} onClick={() => handleRecentSearchClick({ name: search.name })}>
                <img src={getWeatherIconUrl(search.icon)} alt="Weather icon" />
                <span>{search.name}</span>
                <span className="previous-temp">{Math.round(search.temperature)}°C</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
