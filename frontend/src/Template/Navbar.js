import React, { useEffect } from 'react';
import AirlineTitle from './AirlineTitle';
import Login from './Login';
import Logo from './Logo';
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='Navbar'>
            <Logo />
            <AirlineTitle />
            <Login />
        </div>
    );
}