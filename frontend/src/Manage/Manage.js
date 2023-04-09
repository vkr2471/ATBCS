import React from "react";
import { useContext } from "react";
import { UserProvider } from "../App";
import { Redirect } from "react-router-dom";

export default function Manage() {
  const { Loggedin } = useContext(UserProvider);
  if (!Loggedin) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <h1>Previous bookings</h1>
    </div>
  );
}
