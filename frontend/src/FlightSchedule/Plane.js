import React from "react";
import "./Plane.css";

export default function Plane(props) {
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
  var hr = Math.floor(z / 3600000);
  var min = Math.floor((z % 3600000) / 60000);
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
        <li className="plane-name">{props.flightid}</li>
        <li className="plane-ticketfare">₹{props.ticketfare}</li>
        <li>
          <button>Book</button>
        </li>
      </ul>
    </div>
  );
}
