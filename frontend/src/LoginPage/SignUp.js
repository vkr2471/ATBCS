import React from "react";
import "./LoginPage.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserProvider } from "../App";

export default function SignUp() {
  const { Loggedin } = useContext(UserProvider);
  const [flag, setflag] = React.useState(false);
  const [signUpData, setSignUpData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: new Date(),
    password: "",
    confirmPassword: "",
  });

  async function HandleSubmit(event) {
    event.preventDefault();
    if (flag) {
      alert("Passwords do not match");
    } else {
      await axios
        .post("http://localhost:5000/register", signUpData)
        .then((response) => {
          console.log(response);
          alert("Registered Successfully , Please verify your email");
        })
        .catch((error) => {
          //console.log(error)
          alert(error.response.data);
        });
    }
    console.log(signUpData);
  }

  function HandleChange(event) {
    const { name, value } = event.target;
    setSignUpData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    if (name === "confirmPassword" && value !== signUpData.password) {
      setflag(true);
    } else {
      setflag(false);
    }
  }
  if (Loggedin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrapper">
      <form onSubmit={HandleSubmit} className="login-form">
        <h2 className="login-header">Register</h2>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="happy"></ion-icon>
          </span>
          <input
            type="text"
            name="name"
            value={signUpData.name}
            onChange={HandleChange}
            required
          />
          <label>Name</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input
            type="email"
            name="email"
            value={signUpData.email}
            onChange={HandleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="call"></ion-icon>
          </span>
          <input
            type="text"
            name="phoneNumber"
            value={signUpData.phoneNumber}
            onChange={HandleChange}
            required
          />
          <label>Phone Number</label>
        </div>
        <div className="input-box">
          <input
            type="date"
            name="DOB"
            value={signUpData.DOB}
            onChange={HandleChange}
            required
          />
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            name="password"
            value={signUpData.password}
            onChange={HandleChange}
            required
          />
          <label>Password</label>
        </div>
        {flag && <p className="error">Passwords do not match</p>}
        <div className="input-box">
          <span className="icon">
            <ion-icon name="bag-check"></ion-icon>
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={HandleChange}
            required
          />
          <label>Confirm Password</label>
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
