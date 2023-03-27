import React, { useEffect } from 'react';
import AirlineTitle from './AirlineTitle';
import Login from './Login';
import Logo from './Logo';
import './Navbar.css'
import { useContext } from 'react';
import { UserProvider } from '../App';

export default function Navbar() {
    const { Loggedin , setLoggedin } = useContext(UserProvider);
    useEffect(() => {
    if(localStorage.getItem('token') !== null ){
        const date1 = new Date(localStorage.getItem('token'));
        const date = new Date();
        if(date1 > date){
            setLoggedin(true)
            console.log('Logged in');
        }else{
            setLoggedin(false)
            console.log('Logged out');
        }
    }
    else{
        setLoggedin(false)
    }})
    return (
        <div className='Navbar'>
            <Logo />
            <AirlineTitle />
            <Login />
        </div>
    );
}