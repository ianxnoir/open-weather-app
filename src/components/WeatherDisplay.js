import React from 'react';
import { categoryBackgroundsUrl, getWeatherCategory } from '../weatherConstants';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {

  if (!weatherData) {
    return null;
  }

  const { name, weather, main, wind, visibility, sys } = weatherData;
  const { description, icon } = weather[0];

  const convertUnixTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const conditionCode = weather[0].id;
  const category = getWeatherCategory(conditionCode);
  const backgroundImage = categoryBackgroundsUrl[category];

  return (
    <div className="weather-display" style={{ backgroundImage }}>
      <div className="weather-header">
        <h2>{name}</h2>
        <div className="weather-condition">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
          <p>{description}</p>
        </div>
      </div>
      <div className="weather-main">
        <div className="temperature">{Math.round(main.temp)}°</div>
        <div className="feels-like">Feels Like: {Math.round(main.feels_like)}°</div>
      </div>
      <div className="weather-details">
        <div className="detail">
          <span>Wind:</span> {wind.speed} m/s, {wind.deg}°
        </div>
        <div className="detail">
          <span>Visibility:</span> {visibility / 1000} km
        </div>
        <div className="detail">
          <span>Humidity:</span> {main.humidity}%
        </div>
        <div className="detail">
          <span>Pressure:</span> {main.pressure} hPa
        </div>
        <div className="detail">
          <span>Sunrise:</span> {convertUnixTime(sys.sunrise)}
        </div>
        <div className="detail">
          <span>Sunset:</span> {convertUnixTime(sys.sunset)}
        </div>
      </div>
    </div>
  );
};



export default WeatherDisplay;
