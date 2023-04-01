import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile.css";

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
    <div className="profile">
      <h1 className="profile-header">Profile</h1>
      <div className="profile-content">
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Phone number: {user.phone}</h3>
        <h3>Date of birth: {user.dob.split("T")[0]}</h3>
        <h3>ffm: {user.ffm}</h3>
        <h3><Link to={"/manage"}><button>Check your booking here...</button></Link></h3>
      </div>
      <div className="buttons">
        <Link to={"/"}>
          <button className="button">Home</button>
        </Link>
        <Link to={"/logout"}>
          <button className="button">Logout</button>
        </Link>
      </div>
    </div>
  );
}
