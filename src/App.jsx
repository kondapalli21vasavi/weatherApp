/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import {Oval} from'react-loader-spinner'
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  });

  const search = (event) => {
    if (event.key === "Enter") {
      setInput('');
      setWeather({ ...weather, loading: true });

      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: input,
          units: "metric",
          appid: "f00c38e0279b7bc85480c3fe775d518c"
        }
      })
      .then(res => {
        setWeather({ loading: false, data: res.data, error: false });
        console.log(res);
      })
      .catch(err => {
        setWeather({ loading: false, data: {}, error: true });
      });
    }
  };

  const toDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='App'>
      <div className='weather-app'>
        <div className='city-search'>
          <input
            type="text"
            className='city'
            placeholder='Enter City Name...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {
          weather.loading && (
            
            <Oval type="Oval" color='green' height={70} width={70}></Oval>
          )
        }
{
  weather.error && (
    <div className='error-message'>
      <span>City Not Found</span>
    </div>
  )
}
        {weather.data.name && (
          <div>
            <div className='city-name'>
              <h2>{weather.data.name},
                <span>
                  {weather.data.sys?.country}
                </span>
              </h2>
            </div>
            <div className='date'>
              <span>
                {toDate()}
              </span>
            </div>
            <div className='icon-temp'>
              {weather.data.weather && (
                <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
              )}
              {weather.data.main && Math.round(weather.data.main.temp)}
              <sup className='deg'>°C</sup>
            </div>
            <div className='des-wind'>
              {weather.data.weather && (
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
              )}
              {weather.data.wind && (
                <p className='second-p'>WindSpeed: {weather.data.wind.speed}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
