import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import cities from '../data/city.list.json';
import './CitySearch.css';

const CitySearch = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const debouncedFilterCities = debounce((value) => {
      if (value.length > 0) {
        const filtered = cities.filter(city => {
          const searchString = `${city.name.toLowerCase()} ${city.state ? city.state.toLowerCase() : ''} ${city.country.toLowerCase()}`;
          return searchString.includes(value.toLowerCase());
        }).slice(0, 10);
        setFilteredCities(filtered);
      } else {
        setFilteredCities([]);
      }
    }, 300);

    debouncedFilterCities(location);

    return () => {
      debouncedFilterCities.cancel();
    };
  }, [location]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleCitySelect = (city) => {
    setLocation(`${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`);
    setFilteredCities([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const city = cities.find(city => {
      const searchString = `${city.name.toLowerCase()} ${city.state ? city.state.toLowerCase() : ''} ${city.country.toLowerCase()}`;
      return searchString === location.toLowerCase();
    });
    onSearch(city ? city : { name: location });
  };

  return (
    <form onSubmit={handleSearch} className="city-search-form">
      <div className="input-container">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter city name, state, country"
          className="city-input"
        />
        {filteredCities.length > 0 && (
          <ul className="city-suggestions">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(city)}
                className="suggestion-item"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default CitySearch;
