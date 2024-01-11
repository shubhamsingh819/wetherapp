// App.js
import React, { useEffect, useState } from "react";
import CustomLocationForm from "./CustomLocationForm";
import WeatherDisplay from "./WeatherDisplay";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleGetWeather = async (latitude, longitude) => {
    console.log(latitude, longitude, "ddd");
    try {
      const weatherApiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;

      const response = await fetch(weatherApiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "677fa8ef55msh12c799620d55df4p13296djsn3a8a9901fac2",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
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