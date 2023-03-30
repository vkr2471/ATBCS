import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserProvider } from "../App";

export default function About() {
  const { airport } = useContext(UserProvider);
  return (
    <div className="about">
      <h1>About us</h1>
      <p>Add something about us here</p>
      <h2>Our Services:</h2>
      <p>We operate in the following airports</p>
      <ul>
        {airport.map((airports) => {
          return <li key={airports._id}>{airports.city}</li>;
        })}
      </ul>
      <h2>Our flights:</h2>
      <ul></ul>
    </div>
  );
}
