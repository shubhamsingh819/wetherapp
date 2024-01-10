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
    // Check if latitude and longitude are stored in localStorage
    const storedLatitude = localStorage.getItem("latitude");
    const storedLongitude = localStorage.getItem("longitude");

    if (storedLatitude && storedLongitude) {
      // If found, set the values in formik and state
      setLatitude(storedLatitude);
      setLongitude(storedLongitude);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const onSubmit = (data) => {
    console.log(data, "data");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude.toString();
        const currentLongitude = position.coords.longitude.toString();

        // Set the latitude and longitude in the formik values
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
        localStorage.setItem("latitude", currentLatitude || newLatitude);
        localStorage.setItem("longitude", currentLongitude || newLongitude);
        toast.success("Latitude and Longitude Fetched Successfully");
      },
      (error) => {
        console.error("Error getting current location:", error.message);
      }
    );
  };

  const handleClear = () => {
    // Clear values in formik, state, and localStorage
    setLatitude("");
    setLongitude("");
    setNewLatitude("");
    setNewLongitude("");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
  };

  const getCurrentWether = (e) => {
    e.preventDefault();

    if ((!latitude && !newLatitude) || (!longitude && !newLongitude)) {
      return toast.error("Please add Latitude and Longitude first");
    } else {
      toast.success("wether info fethed Successfully");
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
        <Form
          onSubmit={onSubmit}
          style={{ width: "30%", textAlign: "start", marginTop: "10px" }}
        >
          <Form.Label
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "140px",
            }}
          >
            Whether Info App
          </Form.Label>
          <hr
            style={{
              width: "50%",
              borderTop: "5px solid black",
              margin: "10px auto",
            }}
          />
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="mr-1">Latitude</Form.Label>
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Enter Latitude"
              onChange={handleLatitudeChange}
              value={latitude || newLatitude}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Longitude"
              onChange={handleLongitudeChange}
              value={longitude || newLongitude}
            />
          </Form.Group>
          <Button
            onClick={handleClear}
            variant="secondary"
            style={{ marginLeft: "10px" }}
          >
            Clear
          </Button>
          <Button
            variant="success"
            onClick={onSubmit}
            style={{ marginLeft: "10px" }}
          >
            Get Current Location
          </Button>
          <Button
            variant="info"
            onClick={getCurrentWether}
            style={{ marginLeft: "10px" }}
          >
            Get Current Wether
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CustomLocationForm;
