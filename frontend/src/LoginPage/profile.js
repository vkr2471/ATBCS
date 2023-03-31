import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState([]);
  console.log(user);
  if (localStorage.getItem("user") === null) {
    return (
      <div>
        <h1>Profile</h1>
        <h3>You have been logged out</h3>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    );
  }
  if (user.length === 0) {
    axios
      .get(`http://localhost:5000/user/${localStorage.getItem("user")}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }
  if (user.length === 0) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Profile</h1>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Phone number: {user.phone}</h3>
      <h3>Date of birth: {user.dob.split("T")[0]}</h3>
      <h3>ffm: {user.ffm}</h3>
      <h3>Bookings:</h3>
      <div>
        {user.bookings.map((booking, ind) => {
          console.log(ind);
          return (
            <Link to={`/${booking.split(" ")[0]}`}>
              <button>{booking.split(" ")[1]}</button>
            </Link>
          );
        })}
      </div>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
      <Link to={"/logout"}>
        <button>Logout</button>
      </Link>
    </div>
  );
}
