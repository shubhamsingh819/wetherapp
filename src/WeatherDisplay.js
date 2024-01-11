// WeatherDisplay.js
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import toast, { Toaster } from "react-hot-toast";

const WeatherDisplay = ({ weatherData }) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="weather-display-main-container">
        {/* Display weather data */}
        {weatherData && (
          <div>
            <Card className="weather-card">
              <Card.Header>
                <b>Weather Information</b>
              </Card.Header>
              <ListGroup>
                <ListGroup.Item>
                  <b>Location Name:</b> {weatherData?.location?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Region:</b> {weatherData?.location?.region}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <b>Country:</b> {weatherData?.location?.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <b>Temperature (Celsius):</b> {weatherData?.current?.temp_c}°C
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <b>Temperature (Fahrenheit):</b>{" "}
                  {weatherData?.current?.temp_f}
                  °F
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <b>Humidity:</b> {weatherData?.current?.humidity}%
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <b>Wind Speed:</b> {weatherData?.current?.wind_kph} km/h
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <b>Feels Like: </b> {weatherData?.current?.feelslike_f}°F
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherDisplay;
