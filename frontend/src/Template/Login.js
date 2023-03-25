import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className='buttons'>
            <button type='button' className='title-login'>Manage</button>
            <Link to={'/about'}><button type='button' className='title-login'>About us</button></Link>
            <Link to={'/login'}><button type='button' className='title-login'>Login</button></Link>
        </div>
    );
}