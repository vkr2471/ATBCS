import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";

export default function Forgot() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [flag, setflag] = useState(false);
  const [error1, seterror1] = React.useState(false);
  const [error2, seterror2] = React.useState(false);
  const [error3, seterror3] = React.useState(false);
  const [error4, seterror4] = React.useState(false);
  const [error5, seterror5] = React.useState(false);
  const [signUpData, setSignUpData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const url = `http://localhost:5002/forgotpassword/${useParams().email}/${
    useParams().token
  }`;
  const url1 = `http://localhost:5002/forgotpassword/${useParams().token}`;
  async function HandleSubmit(event) {
    event.preventDefault();
    if (error1 || error2 || error3 || error4 || error5) {
      alert("Password does not match the requirements");
      return;
    }
    if (flag) {
      alert("Passwords do not match");
    } else {
      await axios
        .post(url1, signUpData)
        .then((response) => {
          console.log(response);
          if (response.data === "password changed") {
            alert(response.data);
            window.location.href = "/login";
          }
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
  useEffect(() => {
    axios.get(url).then((res) => {
      if (res.data === "p") {
        setVerified(true);
      } else {
        setError(true);
      }
    });
  }, []);
  if (verified) {
    return (
      <div className="wrapper">
        <form onSubmit={HandleSubmit} className="login-form">
          <h2 className="login-header">Set Password</h2>
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
            <label>New Password</label>
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
            <label>Confirm New Password</label>
          </div>
          <button type="submit" className="button">
            Change password
          </button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}
