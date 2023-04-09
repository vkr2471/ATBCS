import React from "react";
import Passenger from "./Person";
import axios from "axios";

export default function PassengerList({ flight }) {
  const now = new Date();
  const HandleClick = () => {
    if (flight.session_id === undefined) {
      alert("You have not booked this flight yet");
    } else {
      axios
        .get(
          `http://localhost:5002/refund/${
            flight.session_id
          }/${localStorage.getItem("user")}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === "refund successful") {
            alert("Your flight has been cancelled");
            window.location.reload();
          } else {
            alert("Your flight could not be cancelled");
          }
        });
    }
  };
  return (
    <div className="passenger-list">
      <h3>Passenger List</h3>
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>First time flier</th>
        </tr>
        {flight.adult.map((adult) => {
          return (
            <Passenger
              name={adult.name}
              age={adult.age}
              ftf={adult.firstTimeFlier}
            />
          );
        })}
        {flight.child.length !== 0 &&
          flight.child.map((child) => {
            return (
              <Passenger
                name={child.name}
                age={child.age}
                ftf={child.firstTimeFlier}
              />
            );
          })}
        {flight.infant.length !== 0 &&
          flight.infant.map((infant) => {
            return (
              <Passenger
                name={infant.name}
                age={infant.age}
                ftf={infant.firstTimeFlier}
              />
            );
          })}
      </table>
      {now - new Date(flight.details.date) < 86400000 && (
        <button onClick={HandleClick}>Cancel</button>
      )}
    </div>
  );
}
