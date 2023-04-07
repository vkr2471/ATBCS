import "./Placemodify.css";
import React from "react";
import { Link } from "react-router-dom";
import { UserProvider } from "../App";
import { useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { detcontext } from "./Flight";

export default function Placemodify() {
  const { airport, setAirport } = useContext(UserProvider);
  const { details, setDetails } = useContext(detcontext);
  let from;
  console.log(from);
  let to;
  let option;
  let adults;
  let children;
  let infants;
  let passengers;
  let date;
  let clas;
  let returndate;
  function Handlesub(e) {
    e.preventDefault();
    from = e.target.from.value;
    to = e.target.to.value;
    option = e.target.option.value;
    adults = parseInt(e.target.adults.value);
    children = parseInt(e.target.children.value);
    infants = parseInt(e.target.infants.value);
    passengers = adults + children + infants;
    date = e.target.departure.value;
    clas = e.target.class.value;
    returndate = e.target.return.value;
    const datas = {
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
        } else {
          setDetails(datas);
        }
      } else {
        setDetails(datas);
      }
    }
  }
  if (airport.length === 0) {
    axios
      .get("http://localhost:5000/airportdata")
      .then((res) => {
        setAirport(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const retur = () => {
    document.getElementById("remod").disabled = false;
  };
  const retu = () => {
    document.getElementById("remod").disabled = true;
  };
  return (
    <div className="place-modify">
      <form className="place-modify-form" onSubmit={Handlesub}>
        <div className="optionsmod">
          <div className="way">
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
          <div className="agemod">
            <div className="adults-age">
              <label className="adults">Adults (greater than 15)</label>
              <select className="adults" name="adults" id="admod">
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
              <select className="children" name="children" id="chmod">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="infants-age">
              <label className="infants">Infants(0-2)</label>
              <select className="infants" name="infants" id="ifmod">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="class-type">
              <label className="class">Class</label>
              <select className="class" name="class" id="clmod">
                <option value="fc">First Class</option>
                <option value="bc">Business Class</option>
                <option value="ec">Economy Class</option>
              </select>
            </div>
          </div>
        </div>
        <div className="dateplace">
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
                  id="frmod"
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
                getOptionLabel={(option) =>
                  option.city + "(" + option.code + ")"
                }
                getOptionValue={(option) => option.city}
                isSearchable={true}
                isClearable={true}
                isLoading={airport.length === 0}
                name="to"
                id="tomod"
              />
            </fieldset>
            <div className="choose-timemod">
              <div className="time">
                <label className="time-header">Departure</label>
                <input
                  type="date"
                  placeholder="Departure Date"
                  className="date"
                  name="departure"
                  id="demod"
                />
              </div>
              <div className="time">
                <label className="time-header">Arrival</label>
                <input
                  type="date"
                  placeholder="Return Date"
                  id="remod"
                  className="date"
                  name="return"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="modify">
            <button className="modify-button" type="submit">
              Modify
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
