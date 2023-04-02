import React, { useState } from "react";
import Adult from "./Adult";
import Children from "./Children";
import Infant from "./Infant";
import "./Book.css";
import axios from "axios";

export default function Book(props) {
  const [Details, setDetails] = React.useState(props.location.state.details);
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
    for (var i = 0; i < ni.length; i++) {
      infant.push({
        name: ni[i].value,
        age: ai[i].value,
        firstTimeFlier: fi[i].checked,
      });
    }
    for (var i = 0; i < nc.length; i++) {
      child.push({
        name: nc[i].value,
        age: ac[i].value,
        firstTimeFlier: fc[i].checked,
      });
    }
    for (var i = 0; i < n.length; i++) {
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
      userId: localStorage.getItem("user"),
    };
    cert.append("data", JSON.stringify(data));
    axios
      .post("http://localhost:5000/book", cert, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  console.log(Details);
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
        <button type="submit" className="submit-button">
          Book
        </button>
      </form>
    </div>
  );
}
