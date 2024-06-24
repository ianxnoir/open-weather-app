import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import cities from '../data/city.list.json';
import './CitySearch.css';

const CitySearch = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const debouncedFilterCities = useCallback(debounce((value) => {
    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); 
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, 300), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    debouncedFilterCities(value);
  };

  const handleCitySelect = (city) => {
    setLocation(`${city.name}, ${city.country}`);
    setSelectedCityId(city.id);
    setFilteredCities([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const city = cities.find(city => city.id === parseInt(selectedCityId));
    const cityToSearch = city ? city : { name: location };
    onSearch(cityToSearch);
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
