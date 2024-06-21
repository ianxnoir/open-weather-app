import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return <div>Loading...</div>;

  const { main, name, weather } = weatherData;
  return (
    <div>
      <h2>{name}</h2>
      <p>{weather[0].description}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
    </div>
  );
};

export default WeatherDisplay;
