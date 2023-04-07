import React, { useEffect } from "react";
import "./Flight.css";
import Plane from "./Planes.js";
import Plane1 from "./Planes1.js";
import Plane2 from "./Planes2.js";
import axios from "axios";
import Placemodify from "./Placemodify";
import { Redirect } from "react-router-dom";

export const detcontext = React.createContext();
export const det1context = React.createContext();

export default function Flight(props) {
  const [loading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState(props.location.state.details);
  const [data, setData] = React.useState([]);
  const [det1, setDet1] = React.useState({});
  const [det2, setDet2] = React.useState({});
  const [redirect, setRedirect] = React.useState(false);
  var i = 0;
  useEffect(async () => {
    setLoading(true);
    if (details.option === "one-way") {
      //console.log("one");
      axios
        .get(
          `http://localhost:5002/search/${details.option}/${details.from}/${details.to}/${details.date}/${details.class}/${details.passengers}`
        )
        .then((res) => {
          console.log("one");
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        });
    } else {
      console.log("two");
      const res = await axios.get(
        `http://localhost:5002/search/${details.option}/${details.from}/${details.to}/${details.date}/${details.returndate}/${details.class}/${details.passengers}`
      );
      setData(res.data);
      setLoading(false);
    }
  }, [details]);
  //const date = data[0]["date"];
  console.log(props.location.state);
  if (loading) {
    return (
      <div className="loading">
        <h1>Searching for your best rides...</h1>
      </div>
    );
  }
  if (details.option !== "one-way") {
    if (data.flight2 === undefined) {
      return (
        <div className="loading">
          <h1>No flights available. Sorry for the inconvenience.</h1>
        </div>
      );
    }
    if (data.flight1.length === 0 || data.flight2.length === 0) {
      return (
        <div className="loading">
          <h1>No flights available. Sorry for the inconvenience.</h1>
        </div>
      );
    } else {
      const HandleBook = (e) => {
        if (det1.id === undefined || det2.id === undefined) {
          alert("Select a flight for both the journeys");
        } else {
          setRedirect(true);
        }
      };
      if (redirect) {
        return (
          <Redirect
            to={{
              pathname: "/book",
              state: {
                details: details,
                flightid: det1.id,
                flightid1: det2.id,
                duration: det1.duration + det2.duration,
                fare: det1.ticketfare + det2.ticketfare,
                arrives: det1.arrival,
                departs: det1.departure,
                arrives1: det2.arrival,
                departs1: det2.departure,
              },
            }}
          />
        );
      }
      return (
        <>
          <div>
            <detcontext.Provider value={{ details, setDetails }}>
              <Placemodify />
            </detcontext.Provider>
          </div>
          <det1context.Provider value={{ det1, setDet1, det2, setDet2 }}>
            <div className="flights">
              <h1 className="flights-header">Available Flights</h1>
              <div className="details">
                <h3 className="date">Date: {details.date}</h3>
                <h3 className="source">Source: {details.from}</h3>
                <h3 className="destination">Destination: {details.to}</h3>
                <h3 className="class">Class: {details.class}</h3>
                <h3 className="passengers">Passengers: {details.passengers}</h3>
              </div>
              {data.flight1.map((available) => {
                return (
                  <Plane1
                    details={details}
                    key={available.flight._id}
                    flightid={available.flight.flightid}
                    arrival={available.flight.arrival}
                    departure={available.flight.departure}
                    ticketfare={available.flight.ticketfare[details.class]}
                    id={available.flight._id}
                  />
                );
              })}
              <div className="details">
                <h3 className="date">Date: {details.returndate}</h3>
                <h3 className="source">Source: {details.to}</h3>
                <h3 className="destination">Destination: {details.from}</h3>
                <h3 className="class">Class: {details.class}</h3>
                <h3 className="passengers">Passengers: {details.passengers}</h3>
              </div>
              {data.flight2.map((available) => {
                return (
                  <Plane2
                    details={details}
                    key={available.flight._id}
                    flightid={available.flight.flightid}
                    arrival={available.flight.arrival}
                    departure={available.flight.departure}
                    ticketfare={available.flight.ticketfare[details.class]}
                    id={available.flight._id}
                  />
                );
              })}
              <button className="book-button" onClick={HandleBook}>
                Book
              </button>
            </div>
          </det1context.Provider>
        </>
      );
    }
  }
  return (
    <>
      <div className="flights">
        <h1 className="flights-header">Available Flights</h1>
        <div className="details">
          <h3 className="date">Date: {details.date}</h3>
          <h3 className="source">Source: {details.from}</h3>
          <h3 className="destination">Destination: {details.to}</h3>
          <h3 className="class">Class: {details.class}</h3>
          <h3 className="passengers">Passengers: {details.passengers}</h3>
        </div>
        {data.flight1.length ? (
          data.flight1.map((available) => {
            return (
              <Plane
                details={details}
                key={available.flight._id}
                flightid={available.flight.flightid}
                arrival={available.flight.arrival}
                departure={available.flight.departure}
                ticketfare={available.flight.ticketfare[details.class]}
                id={available.flight._id}
              />
            );
          })
        ) : (
          <h1 className="no-available">
            No flights available. Sorry for the inconvenience.
          </h1>
        )}
      </div>
      <div>
        <detcontext.Provider value={{ details, setDetails }}>
          <Placemodify />
        </detcontext.Provider>
      </div>
    </>
  );
}
