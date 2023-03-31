import React, { useEffect } from "react";
import "./Flight.css";
import Details from "./Details";
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
  return <div className="flights"></div>;
}
