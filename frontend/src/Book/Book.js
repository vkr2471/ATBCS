import React, { useState } from "react";
import Adult from "./Adult";
import Children from "./Children";
import Infant from "./Infant";
import "./Book.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Book(props) {
  const [Details, setDetails] = React.useState(props.location.state.details);
  const [ffmu, setffmu] = useState(false);
  const [ffm, setFfm] = React.useState(-1);
  const [fare, setFare] = React.useState(
    (Details.adults + Details.children) * props.location.state.fare +
      Details.infants * props.location.state.fare * 0.5
  );
  const [message, setMessage] = useState(
    "Verification under process. Please check your email for updates"
  );
  console.log(fare);
  if (ffm === -1) {
    axios
      .get(`http://localhost:5002/ffm/${localStorage.getItem("user")}`)
      .then((res) => {
        setFfm(res.data.ffm);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function ffmchecked(e) {
    setffmu(e.target.checked);
    if (e.target.checked) {
      setFare(fare - Math.floor(ffm / 1000) * 100);
    } else {
      setFare(fare + Math.floor(ffm / 1000) * 100);
    }
  }
  async function handleSub(event) {
    event.preventDefault();
    var n = document.getElementsByClassName("adult-name");
    var a = document.getElementsByClassName("adult-age");
    var e = document.getElementsByClassName("adult-email");
    var p = document.getElementsByClassName("adult-phone");
    var f = document.getElementsByClassName("adult-firstTimeFlier");
    var c = document.getElementsByClassName("adult-cowinCertificate");
    var nc = document.getElementsByClassName("child-name");
    var ac = document.getElementsByClassName("child-age");
    var fc = document.getElementsByClassName("child-firstTimeFlier");
    var ni = document.getElementsByClassName("infant-name");
    var ai = document.getElementsByClassName("infant-age");
    var fi = document.getElementsByClassName("infant-firstTimeFlier");
    const cert = new FormData();
    var adult = [];
    var child = [];
    var infant = [];
    const imgs = [];
    var ftm = false;
    for (var i = 0; i < ni.length; i++) {
      infant.push({
        name: ni[i].value,
        age: ai[i].value,
        firstTimeFlier: fi[i].checked,
      });
    }
    for (var i = 0; i < nc.length; i++) {
      if (fc[i].checked) {
        ftm = true;
      }
      child.push({
        name: nc[i].value,
        age: ac[i].value,
        firstTimeFlier: fc[i].checked,
      });
    }
    for (var i = 0; i < n.length; i++) {
      if (f[i].checked) {
        ftm = true;
      }
      cert.append("image", c[i].files[0]);
      adult.push({
        name: n[i].value,
        age: a[i].value,
        email: e[i].value,
        phone: p[i].value,
        firstTimeFlier: f[i].checked,
      });
    }
    const data = {
      adult: adult,
      child: child,
      infant: infant,
      details: Details,
      flightId: props.location.state.flightid,
      flightId1: props.location.state.flightid1,
      flight_number: props.location.state.flight_number,
      flight_number1: props.location.state.flight_number1,
      to: props.location.state.to,
      from: props.location.state.from,
      arrives: props.location.state.arrives,
      departs: props.location.state.departs,
      arrives1: props.location.state.arrives1,
      departs1: props.location.state.departs1,
      duration: props.location.state.duration,
      userId: localStorage.getItem("user"),
      ffmUsed: ffmu,
      ftm: ftm,
    };
    console.log("data", data);
    cert.append("data", JSON.stringify(data));
    axios
      .post("http://localhost:5002/book", cert, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setMessage(res.data);
      });
  }
  if (message !== "") {
    return <Redirect to="/book-ver" />;
  }
  return (
    <div className="book-wrapper">
      <form onSubmit={handleSub} encType="multipart/form-data">
        <h1 className="book-wrapper-header">Book a Ticket</h1>
        {[...Array(Details.adults)].map((e, i) => {
          console.log(i);
          return (
            <div>
              <h3 className="adult-header">Adult {i + 1}</h3>
              <Adult />
            </div>
          );
        })}
        {[...Array(Details.children)].map((e, i) => {
          return (
            <div>
              <h3 className="child-header">Child {i + 1}</h3>
              <Children />
            </div>
          );
        })}
        {[...Array(Details.infants)].map((e, i) => {
          return (
            <div>
              <h3 className="infant-header">Infant {i + 1}</h3>
              <Infant />
            </div>
          );
        })}
        <div className="ffm-wrapper">
          <label className="ffm-label">Available FFM: {ffm}</label>
          <br />
          <label className="ffm-label">
            Use FFM (you will get a discount of ₹{Math.floor(ffm / 1000) * 100})
          </label>
          <input
            type="checkbox"
            className="ffm-checkbox"
            onChange={(e) => ffmchecked(e)}
            disabled={ffm <= 1000}
          />
        </div>
        <h3 className="fare-header">
          Total Fare: ₹{fare.toLocaleString("en-IN")}
        </h3>
        <button type="submit" className="submit-button">
          Book
        </button>
      </form>
    </div>
  );
}
