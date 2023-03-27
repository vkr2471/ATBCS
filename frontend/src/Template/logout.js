import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Logout() {
    return (
        <div className="logout-header">
            <h1 >Are you sure you want to logout ?</h1>
            <div className="logout-options">
                <Link to={`/yes/${localStorage.getItem('user')}`} ><button className="logout-yes">Yes</button></Link>
                <Link to={"/"} ><button className="logout-no">No</button></Link>
            </div>
        </div>
    );
}