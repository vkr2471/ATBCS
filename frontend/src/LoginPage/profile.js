import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
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
        {/* <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Phone number: {user.phone}</h3>
        <h3>Date of birth: {user.dob.split("T")[0]}</h3>
        <h3>ffm: {user.ffm}</h3> */}

        <table>
          <td className="attributes">
            <tr>Name</tr>
            <tr>Email</tr>
            <tr>Phone number</tr>
            <tr>Date of Birth</tr>
            <tr>FFM</tr>
          </td>
          <td>
            <tr>{user.name}</tr>
            <tr>{user.email}</tr>
            <tr>{user.phone}</tr>
            <tr>{user.dob.split("T")[0]}</tr>
            <tr>{user.ffm}</tr>
          </td>
        </table>
      </div>
      <div className="buttons">
        <Link to={"/"}>
          <button className="button">Home</button>
        </Link>
        <Link to={"/manage"}>
          <button className="button">Your bookings</button>
        </Link>
        <Link>
          <button className="button" onClick={() => setIsOpen(true)}>
            Logout
          </button>
        </Link>
      </div>
      {isOpen && (
        <div className="logout-header">
          <h1>Are you sure you want to log out?</h1>
          <div className="logout-options">
            <Link to={`/yes/${localStorage.getItem("user")}`}>
              <button className="logout-yes">Yes</button>
            </Link>
            <Link onClick={() => setIsOpen(false)}>
              <button className="logout-no">No</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
