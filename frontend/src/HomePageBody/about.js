import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserProvider } from "../App";
import "./about.css";

export default function About() {
  const { airport, setAirport } = useContext(UserProvider);
  airport.sort(function (a, b) {
    var x = a.city < b.city ? -1 : 1;
    return x;
  });
  if (airport.length === 0) {
    axios
      .get("http://localhost:5002/airportdata")
      .then((res) => {
        setAirport(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [flights, setFlights] = React.useState([]);
  if (flights.length === 0) {
    axios
      .get("http://localhost:5002/flights")
      .then((res) => {
        console.log(res.data);
        setFlights(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="about">
      <div className="about-us">
        <h1 className="header">About us</h1>
        <p className="content">
          Of all the books in the world, the best stories are found between the
          pages of passport. We will help you create the best of them.
        </p>
        <p className="content">
          We are a team of travel enthusiasts who want to make your travel
          experience as smooth as possible. We are here to help you find the
          best flight deals and to make your travel experience as smooth as
          possible.
        </p>
      </div>
      <h2 className="services">Our Services:</h2>
      <p className="services-text">We operate in the following airports</p>
      <ul className="service-list">
        {airport.map((airports) => {
          return (
            <li key={airports._id} className="airports">
              {airports.city}
            </li>
          );
        })}
      </ul>
      <ul></ul>
    </div>
  );
}
