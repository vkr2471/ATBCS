import React, { useEffect } from "react";
import "./Flight.css";
import Plane from "./Planes.js";
import axios from "axios";
import Placemodify from "./Placemodify";

export const detcontext = React.createContext();

export default function Flight(props) {
  const [loading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState(props.location.state.details);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/search/${details.from}/${details.to}/${details.date}/${details.class}/${details.passengers}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      });
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
        {data.availableflights.length ? (
          data.availableflights.map((available) => {
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
