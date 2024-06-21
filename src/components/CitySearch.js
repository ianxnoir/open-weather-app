import React, { useState } from 'react';

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const cityToSearch = selectedCity || city;
    onSearch(cityToSearch);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
        <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city.name}>
            {city.name}, {city.country}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default CitySearch;
