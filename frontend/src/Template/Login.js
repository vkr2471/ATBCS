import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserProvider } from "../App";

export default function Login() {
  const { Loggedin } = useContext(UserProvider);
  return (
    <div className="buttons">
      <Link to={"/about"}>
        <button type="button" className="title-login">
          About us
        </button>
      </Link>
      {Loggedin ? (
        <Link to={"/manage"}>
          <button type="button" className="title-login">
            Manage
          </button>
        </Link>
      ) : (
        <Link to={"/signup"}>
          <button type="button" className="title-login">
            Register
          </button>
        </Link>
      )}
      {Loggedin ? (
        <Link to={`/profile/${localStorage.getItem("user")}`}>
          <button type="button" className="title-login">
            Profile
          </button>
        </Link>
      ) : (
        <Link to={"/login"}>
          <button type="button" className="title-login">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
