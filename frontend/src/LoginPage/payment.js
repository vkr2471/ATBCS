import React from "react";
import { useParams } from "react-router-dom";

export default function Payment(props) {
  return (
    <div>
      <h1>Payment</h1>
      <a href={props.location.state.url}>click here to pay</a>
    </div>
  );
}
