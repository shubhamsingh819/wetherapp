// WeatherDisplay.js
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const WeatherDisplay = ({ weatherData }) => {
  console.log("w", weatherData);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Display weather data */}
      {weatherData && (
        <div>
          <Card style={{ width: "30rem", marginTop: "15px" }}>
            <Card.Header>Weather Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Location:</b> {weatherData.location.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Region:</b>
                {weatherData.location.region}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <b>Country:</b> {weatherData.location.country}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <b>Temperature (Celsius):</b> {weatherData.current.temp_c}°C
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <b>Humidity</b> {weatherData.current.humidity}%
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <b>Wind Speed</b> {weatherData.current.wind_kph} km/h
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <b>Feels Like: </b> {weatherData.current.feelslike_f}°F
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
