// App.js
import React, { useEffect, useState } from "react";
import CustomLocationForm from "./CustomLocationForm";
import WeatherDisplay from "./WeatherDisplay";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const handleGetWeather = async (latitude, longitude) => {
    console.log(latitude, longitude, "ddd");
    try {
      const weatherApiUrl = `${process.env.REACT_APP_WEATHER_API_URL}${latitude},${longitude}`;

      const response = await fetch(weatherApiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_WEATHER_HOST,
        },
      });
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  useEffect(() => {
    // Load saved latitude and longitude from localStorage
    const savedLatitude = localStorage.getItem("latitude");
    const savedLongitude = localStorage.getItem("longitude");
    console.log("sss", savedLatitude, savedLongitude);

    if (savedLatitude && savedLongitude) {
      // Triggering API call with saved values
      handleGetWeather(savedLatitude, savedLongitude);
    }
  }, []);

  return (
    <div className="main-container">
      <CustomLocationForm onGetWeather={handleGetWeather} />
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;
