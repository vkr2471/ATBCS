import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default async function Paysucce() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  await axios
    .get(`http://localhost:5002/success/${useParams().id}`)
    .then((res) => {
      setLoading(false);
    })
    .catch((err) => {
      setError(true);
      setLoading(false);
    });
  if (loading) {
    return (
      <>
        <div className="spinner-container">
          <h1>Confirming the booking...</h1>
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div>
        <h2>Booking has failed</h2>
        <p>
          Sorry for the inconvenience. Please try again later this booking will
          be stored as pending booking in your profile
        </p>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Booking confirmed</h1>
      <p>
        Thank you for booking with us. Your booking has been confirmed. You can
        view your booking in your profile. More information about the booking
        will be sent you through mail
      </p>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </div>
  );
}
