import React, { useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { UserProvider } from "../App";
import { Redirect } from "react-router-dom";

export default function PlaceSearch() {
  const { airport, setAirport } = useContext(UserProvider);
  const [redirect, setRedirect] = React.useState(false);
  const [details, setDetails] = React.useState({});
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target.from.value;
    const to = e.target.to.value;
    const option = e.target.option.value;
    const adults = parseInt(e.target.adults.value);
    const children = parseInt(e.target.children.value);
    const infants = parseInt(e.target.infants.value);
    const passengers = adults + children + infants;
    const date = e.target.departure.value;
    const clas = e.target.class.value;
    const returndate = e.target.return.value;
    const data = {
      from: from,
      to: to,
      option: option,
      passengers: passengers,
      date: date,
      returndate: returndate,
      class: clas,
      adults: adults,
      children: children,
      infants: infants,
    };
    console.log(data);
    const now = new Date();
    if (date === "" || from === "" || to === "" || from === to) {
      alert("Invalid Date or source or destination");
    } else {
      const date1 = new Date(date);
      if (date1 < now) {
        alert("Invalid Date");
      } else if (option === "round-trip") {
        const date2 = new Date(returndate);
        if (date2 < now) {
          alert("Invalid Date");
        } else if (date1 > date2) {
          alert("Invalid Date");
        }
      } else {
        setDetails(data);
        setRedirect(true);
      }
    }
  };
  const retur = () => {
    document.getElementById("return").disabled = false;
  };
  const retu = () => {
    document.getElementById("return").disabled = true;
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/flight-search",
          state: { details: details },
        }}
      />
    );
  }
  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Search Flights</h2>
        <div className="options">
          <input
            type="radio"
            name="option"
            id="one"
            value="one-way"
            defaultChecked
            onClick={retu}
          />
          <label>One Way</label>
          <input
            type="radio"
            name="option"
            id="round"
            value="round-trip"
            onClick={retur}
          />
          <label>Round Trip</label>
        </div>
        <div className="search-place">
          <fieldset className="place">
            <legend>From</legend>
            <div className="textbox">
              <Select
                className="textbox"
                placeholder="City or Airport"
                options={airport}
                getOptionLabel={(option) =>
                  option.city + "(" + option.code + ")"
                }
                getOptionValue={(option) => option.city}
                isSearchable={true}
                isClearable={true}
                isLoading={airport.length === 0}
                name="from"
              />
            </div>
          </fieldset>
          <fieldset className="place">
            <legend>To</legend>
            <Select
              className="textbox"
              placeholder="City or Airport"
              options={
                airport.length
                  ? airport
                  : [{ city: "Loading", code: "Loading" }]
              }
              getOptionLabel={(option) => option.city + "(" + option.code + ")"}
              getOptionValue={(option) => option.city}
              isSearchable={true}
              isClearable={true}
              isLoading={airport.length === 0}
              name="to"
            />
          </fieldset>
        </div>
        <label className="passenger">Passengers</label>
        {/*  */}
        <div className="age">
          <div className="adults-age">
            <label className="adults">Adults (greater than 15)</label>
            <select className="adults" name="adults">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="children-age">
            <label className="children">Children (2-15)</label>
            <select className="children" name="children">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="infants-age">
            <label className="infants">Infants(0-2)</label>
            <select className="infants" name="infants">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="class-type">
            <label className="class">Class</label>
            <select className="class" name="class">
              <option value="fc">First Class</option>
              <option value="bc">Business Class</option>
              <option value="ec">Economy Class</option>
            </select>
          </div>
        </div>
        {/*  */}
        <div className="choose-time">
          <div className="time">
            <label className="time-header">Departure</label>
            <input
              type="date"
              placeholder="Departure Date"
              className="date"
              name="departure"
            />
          </div>
          <div className="time">
            <label className="time-header">Arrival</label>
            <input
              type="date"
              placeholder="Return Date"
              id="return"
              className="date"
              name="return"
              disabled
            />
          </div>
        </div>
        <button className="search-button" type="submit">
          Show Available Flights
        </button>
      </form>
    </div>
  );
}
