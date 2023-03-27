import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { UserProvider } from "../App";

export default function PlaceSearch() {
  const { airport, setAirport } = useContext(UserProvider);
  if (airport.length === 0) {
    axios
      .get("http://localhost:5000/airportdata")
      .then((res) => {
        setAirport(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const retur = () => {
    document.getElementById("return").disabled = false;
  };
  const retu = () => {
    document.getElementById("return").disabled = true;
  };
  return (
    <div className="wrapper">
      <form className="form">
        <h2 className="title">Search Flights</h2>
        <div className="options">
          <input
            type="radio"
            name="option"
            id="one"
            value="one-way"
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
                getOptionValue={(option) => option.code}
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
              getOptionValue={(option) => option.code}
              isSearchable={true}
              isClearable={true}
              isLoading={airport.length === 0}
              name="to"
            />
          </fieldset>
        </div>
        <label className="passenger">Passengers</label>
        <div className="age">
          <div className="adults-age">
            <label className="adults">Adults (greater than 15)</label>
            <select className="adults">
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
            <select className="children">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="infants-age">
            <label className="infants">Infants(0-2)</label>
            <select className="infants">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="choose-time">
          <div className="time">
            <label className="time-header">Departure</label>
            <input type="date" placeholder="Departure Date" className="date" />
          </div>
          <div className="time">
            <label className="time-header">Arrival</label>
            <input
              type="date"
              placeholder="Return Date"
              id="return"
              className="date"
              disabled
            />
          </div>
        </div>
        <Link to={"/search/"}>
          <button className="search-button">Show Available Flights</button>
        </Link>
      </form>
    </div>
  );
}
