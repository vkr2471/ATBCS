import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./paysuccess.css";

export default function Paysucce() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const url = `http://localhost:5002/success/${useParams().id}`;
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);
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
      <div className="error">
        <h2>Booking has failed&ensp;<i class='fas fa-sad-tear'></i></h2>
        <p>
          Sorry for the inconvenience. Please try again later, this booking will
          be stored as pending booking in your profile.
        </p>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="confirmed">
      <h1>Booking confirmed&ensp;<ion-icon name='happy'></ion-icon></h1>
      <p>
        Thank you for booking with us. Your booking has been confirmed. You can
        view your booking in your profile. More information about the booking
        will be sent you through mail
      </p>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
      <div class="happy">
        <span>H</span>
        <span>A</span>
        <span>P</span>
        <span>P</span>
        <span>Y</span>
        <span>&ensp;</span>
        <span>J</span>
        <span>O</span>
        <span>U</span>
        <span>R</span>
        <span>N</span>
        <span>E</span>
        <span>Y</span>
      </div>
    </div>
  );
}
