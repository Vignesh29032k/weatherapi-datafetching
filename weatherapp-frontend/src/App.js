import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Swal from 'sweetalert2'
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if(!city.trim()){
      Swal.fire({
        icon : 'warning',
        title : 'Missing City name',
        text : 'Please enter the city',
      })
      return;
    }
    if (loading) return;  
    
    setLoading(true);  // Allow future calls again

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/weather/', {
        params: { city },
      });
      setWeather(response.data);
      setError('');
      // setCity('')
    } catch (err) {
      setWeather(null);
      setError('');
      setCity('')
      Swal.fire({
        icon : 'error',
        title : 'City Not Found',
        text : 'Please enter the valid city',
      })
    } finally {
      setLoading(false);  // Allow future calls again
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

