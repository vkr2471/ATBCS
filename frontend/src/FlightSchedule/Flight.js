import React, { useEffect } from "react";
import "./Flight.css";
import Plane from "./Plane.js";
import axios from "axios";

export default function Flight(props) {
  const [dataTable, setDataTable] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState(props.location.state.details);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    console.log(
      `http://localhost:5000/search/${details.source}/${details.destination}/${details.date}/${details.class}/${details.passengers}`
    );
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
  return (<div className="flights">
    <h1 className="flights-header">Available Flights</h1>
    <div className="details">
      <h3 className="date">Date: {details.date}</h3>
      <h3 className="source">Source: {details.from}</h3>
      <h3 className="destination">Destination: {details.to}</h3>
    </div>
    {data.availableflights.map((available) => {
        return(
          <Plane key={available.flight._id}
           flightid={available.flight.flightid} 
           arrival={available.flight.arrival}
           departure={available.flight.departure}
           ticketfare={available.flight.ticketfare[details.class]}
          />
        )
    })}
  </div>);
}
