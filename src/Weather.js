import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "408544b59ade2984b41d66f8c2bdde41";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="search" />
        <input type="submit" value="Search" onChange={updateCity} />
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature:{weather.temperature}</li>
          <li>Description:{weather.description}</li>
          <li>Humidity:{weather.humidity}</li>
          <li>Wind:{weather.wind}</li>
          <li>
            <img src={weather.icon} alt={weather.description}></img>
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
