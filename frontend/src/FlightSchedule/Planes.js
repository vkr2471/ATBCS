import React from "react";
import "./Plane.css";
import { UserProvider } from "../App";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Plane(props) {
  console.log("Plane");
  console.log(props);
  const { Loggedin } = useContext(UserProvider);
  const [redirect, setRedirect] = React.useState(false);
  const [redirect1, setRedirect1] = React.useState(false);
  var year = "2013";
  var month = "04";
  var day = "18";
  const a = props["departure"].split(" ");
  const b = props["arrival"].split(" ");
  var hour1 = parseInt(a[0].split(":")[0]);
  var hour2 = parseInt(b[0].split(":")[0]);
  var min1 = parseInt(a[0].split(":")[1]);
  var min2 = parseInt(b[0].split(":")[1]);
  if (a[1] == "PM" && hour1 != 12) hour1 += 12;
  if (b[1] == "PM" && hour2 != 12) hour2 += 12;
  if (a[1] == "AM" && hour1 == 12) hour1 = 0;
  if (b[1] == "AM" && hour2 == 12) hour2 = 0;
  const time1 = new Date(year, month, day, hour1, min1);
  const time2 = new Date(year, month, day, hour2, min2);
  var z = time2.getTime() - time1.getTime();
  if (z < 0) z += 86400000;
  var hr = Math.floor(z / 3600000);
  var min = Math.floor((z % 3600000) / 60000);
  const HandleBooking = (flightid) => {
    if (Loggedin) {
      setRedirect1(true);
    } else {
      alert("Please Login to Book a Ticket");
      setRedirect(true);
    }
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            details: props.details,
          },
        }}
      />
    );
  }
  if (redirect1) {
    return (
      <Redirect
        to={{
          pathname: "/book",
          state: {
            details: props.details,
            flightid: props.id,
            duration: z / 3600000,
            fare: props.ticketfare,
          },
        }}
      />
    );
  }
  return (
    <div className="plane">
      <ul className="plane-details">
        <li className="plane-departure">{props.departure}</li>
        <li>
          <ion-icon name="airplane" size="large"></ion-icon>
          <p>
            &ensp;----{hr}hr {min}mins------
          </p>
        </li>
        <li className="plane-arrival">{props.arrival}</li>
        <li className="plane-name">{props.flightid}&emsp;&emsp;&emsp;</li>
        <li className="plane-ticketfare">
          ₹{props.ticketfare.toLocaleString("en-IN")}
        </li>
        <li>
          <button onClick={() => HandleBooking(props.key)}>Book</button>
        </li>
      </ul>
    </div>
  );
}
