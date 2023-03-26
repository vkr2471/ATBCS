import React from "react";
import { Link } from "react-router-dom";

export default function Logout() {
    return (
        <div>
            <h1>Are you sure you want to logout</h1>
            <Link to={`/yes/${localStorage.getItem('user')}`}>Yes</Link>
            <Link to={"/"}>No</Link>
        </div>
    );
}