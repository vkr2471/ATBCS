import React from "react";
import "./Plane.css";

export default function Plane(props) {
    return (
        <div className="plane">
            <ul className="plane-details">
            <li className="plane-arrival">{props.arrival}</li>
            <li>
                <ion-icon name="airplane" size="large"></ion-icon>
                <p>&ensp;----duration------</p>
            </li>
            <li className="plane-departure">{props.departure}</li>
            <li className="plane-name">{props.flightid}</li>
            <li className="plane-ticketfare">₹{props.ticketfare}</li>
            <li><button>Book</button></li>
            </ul>
        </div>
    );
}