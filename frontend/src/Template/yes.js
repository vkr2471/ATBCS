import React from "react";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import {UserProvider} from "../App";

export default function Yes() {
    const { setLoggedin } = useContext(UserProvider);
    setLoggedin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You have been logged out");
    return <Redirect to="/login" />;
}