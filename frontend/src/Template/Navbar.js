import React from 'react';
import AirlineTitle from './AirlineTitle';
import Login from './Login';
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='Navbar'>
            <AirlineTitle />
            <Login />
        </div>
    );
}