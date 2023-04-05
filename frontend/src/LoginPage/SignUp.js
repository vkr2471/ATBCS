import React from "react";
import "./LoginPage.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserProvider } from "../App";

export default function SignUp() {
  const { Loggedin } = useContext(UserProvider);
  const [flag, setflag] = React.useState(false);
  const [error1, seterror1] = React.useState(false);
  const [error2, seterror2] = React.useState(false);
  const [error3, seterror3] = React.useState(false);
  const [error4, seterror4] = React.useState(false);
  const [error5, seterror5] = React.useState(false);
  const [nameerr, setnameerr] = React.useState(false);
  const [ageerror, setageerror] = React.useState(false);
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
    if (ageerror) {
      alert("You must be 18 years or older to register");
      return;
    }
    if (error1 || error2) {
      alert("Password does not match the requirements");
      return;
    }
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
    if (name === "name") {
      if (value.length > 40) {
        setnameerr(true);
      } else {
        setnameerr(false);
      }
    }
    if (name === "DOB") {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 18) {
        setageerror(true);
      } else {
        setageerror(false);
      }
    }
    if (name === "password") {
      if (value.length < 8) {
        seterror1(true);
      } else {
        seterror1(false);
      }
      if (!value.match(/[A-Z]/)) {
        seterror2(true);
      } else {
        seterror2(false);
      }
      if (!value.match(/[a-z]/)) {
        seterror3(true);
      } else {
        seterror3(false);
      }
      if (!value.match(/[0-9]/)) {
        seterror4(true);
      } else {
        seterror4(false);
      }
      if (!value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        seterror5(true);
      } else {
        seterror5(false);
      }
    }
    if (name === "confirmPassword" && value !== signUpData.password) {
      setflag(true);
    } else if (name === "confirmPassword" && value === signUpData.password) {
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
        {nameerr && (
          <p className="error">Name should be less than 40 characters</p>
        )}
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
            type="tel"
            name="phoneNumber"
            value={signUpData.phoneNumber}
            onChange={HandleChange}
            required
          />
          <label>Phone Number</label>
        </div>
        {ageerror && <p className="error">You must be 18 years or older</p>}
        <div className="input-box">
          <input
            type="date"
            name="DOB"
            value={signUpData.DOB}
            onChange={HandleChange}
            required
          />
        </div>
        {error1 && (
          <p className="error">Password should be of minimum 8 characters</p>
        )}
        {error2 && (
          <p className="error">
            Password should contain atleast one uppercase character
          </p>
        )}
        {error3 && (
          <p className="error">
            Password should contain atleast one lowercase character
          </p>
        )}
        {error5 && (
          <p className="error">
            Password should contain atleast one special character
          </p>
        )}
        {error4 && (
          <p className="error">Password should contain atleast one number</p>
        )}
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
