import React from 'react';
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
  const backgroundImage = categoryBackgrounds[category];

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


const getWeatherCategory = (conditionCode) => {
  for (const [category, codes] of Object.entries(weatherCategories)) {
    if (codes.includes(conditionCode)) {
      return category;
    }
  }
  return 
};

const weatherCategories = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzleRain: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clearCalm: [800, 951],
  clouds: [801, 802, 803, 804],
  windy: [900, 901, 902, 903, 904, 905, 906, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962],
  hail: [906],
};

const categoryBackgrounds = {
  thunderstorm: 'url(/images/thunderstorm.gif)',
  drizzleRain: 'url(/images/drizzle_rain.gif)',
  snow: 'url(/images/snow.gif)',
  atmosphere: 'url(/images/mist.gif)',
  clearCalm: 'url(/images/clear.gif)',
  clouds: 'url(/images/clouds.gif)',
  windy: 'url(/images/windy.gif)',
  hail: 'url(/images/hail.gif)',
};


export default WeatherDisplay;
