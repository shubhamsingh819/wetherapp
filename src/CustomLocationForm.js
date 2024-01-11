// CustomLocationForm.js
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./App.css";

const CustomLocationForm = ({ onGetWeather }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");

  useEffect(() => {
    // Checking if latitude and longitude are stored in localStorage
    const storedLatitude = localStorage.getItem("latitude");
    const storedLongitude = localStorage.getItem("longitude");

    if (storedLatitude && storedLongitude) {
      setLatitude(storedLatitude);
      setLongitude(storedLongitude);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;

        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
        localStorage.setItem("latitude", currentLatitude || newLatitude);
        localStorage.setItem("longitude", currentLongitude || newLongitude);
        toast.success("Latitude and Longitude Fetched Successfully");
      },
      (error) => {
        toast.error("Error while geeting Latitude and Longitude");
        console.error("Error getting current location:", error.message);
      }
    );
  };

  const handleClear = () => {
    setLatitude("");
    setLongitude("");
    setNewLatitude("");
    setNewLongitude("");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
  };

  const getCurrentWether = () => {
    if ((!latitude && !newLatitude) || (!longitude && !newLongitude)) {
      return toast.error("Please add Latitude and Longitude first");
    } else {
      localStorage.setItem("latitude", latitude || newLatitude);
      localStorage.setItem("longitude", longitude || newLongitude);
      toast.success("weather info fethed Successfully");
      onGetWeather(latitude || newLatitude, longitude || newLatitude);
    }
  };

  const handleLatitudeChange = (e) => {
    setNewLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setNewLongitude(e.target.value);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="customlocation-main-container">
        <Form className="customlocation-form">
          <Form.Label className="custom-form-label">
            Weather Info App
          </Form.Label>
          <hr className="line-style" />
          <Form.Group className="mb-2">
            <Form.Label className="mr-1">Latitude</Form.Label>
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Enter Latitude"
              onChange={handleLatitudeChange}
              value={latitude || newLatitude}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Longitude"
              onChange={handleLongitudeChange}
              value={longitude || newLongitude}
            />
          </Form.Group>
          <div>
            <Button onClick={handleClear} variant="secondary" className="mb-2">
              Clear
            </Button>{" "}
            <Button
              variant="success"
              onClick={getCurrentLocation}
              className="mb-2"
            >
              Get Current Location
            </Button>{" "}
            <Button variant="info" onClick={getCurrentWether} className="mb-2">
              Get Current Weather
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CustomLocationForm;
