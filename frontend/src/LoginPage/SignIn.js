import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import { UserProvider } from "../App";
import { useContext } from "react";
import { Redirect } from "react-router-dom";

export default function SignIn(props) {
  const [signInData, setSignInData] = React.useState({
    email: "",
    password: "",
  });
  const [pay, setPay] = React.useState(null);
  const { Loggedin, setLoggedin } = useContext(UserProvider);
  async function HandleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5002/login", signInData)
      .then(async (response) => {
        const user = response.data;
        localStorage.setItem("user", user.user);
        localStorage.setItem("token", user.session.cookie.expires);
        const due = await axios.get(`http://localhost:5002/pl/${user.user}`);
        if (due.data.pl === null) {
          alert("Logged In Successfully");
          setLoggedin(true);
        } else {
          const conf = window.confirm(
            "You have a pending transaction.\nDo you want to pay it or cancel it?"
          );
          if (conf) {
            const paye = await axios.get(
              `http://localhost:5002/payment/${due.data.pl}/0`
            );
            setPay(paye.data);
          } else {
            const cancel = await axios.get(
              `http://localhost:5002/cancel/${due.data.pl}`
            );
            alert("Logged In Successfully and your payment has been cancelled");
          }
          setLoggedin(true);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  }

  function HandleChange(event) {
    const { name, value } = event.target;
    setSignInData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  if (Loggedin) {
    if (pay !== null) {
      return (
        <Redirect
          to={{
            pathname: "/payment",
            state: { url: pay },
          }}
        ></Redirect>
      );
    }
    if (props.location.state === undefined) {
      return <Redirect to="/" />;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/flight-search",
            state: { details: props.location.state.details },
          }}
        />
      );
    }
  }
  return (
    <div className="wrapper">
      <form onSubmit={HandleSubmit} className="login-form">
        <h2 className="login-header">Login</h2>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input
            type="text"
            name="email"
            value={signInData.email}
            onChange={HandleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            name="password"
            value={signInData.password}
            onChange={HandleChange}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="button">
          Sign In
        </button>
        <div className="login-register">
          <p>
            Don't have an acccount?
            <Link to={"/signup"}>
              <button type="button">Sign Up</button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
