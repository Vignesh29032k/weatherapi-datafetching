import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if(!city.trim()){
      alert('Please Enter the city name')
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/api/weather/', {
        params: { city }
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found');
      setCity('')
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input className='input-field'
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button className='btn' onClick={fetchWeather}>Get Weather</button>

      {error && <p className='error'>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description} />
          <h2 className='temp'>{weather.main.temp} °C</h2>
        </div>
      )}
    </div>
  );
}

export default App;

