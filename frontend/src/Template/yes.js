import React from "react";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/context";

export default function Yes() {
    const { setLoggedin } = useContext(UserContext);
    setLoggedin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You have been logged out");
    return <Redirect to="/login" />;
}