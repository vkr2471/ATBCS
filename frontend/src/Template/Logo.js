import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from './Cloud9logo.png';

export default function Logo() {
    return (
        <div>
            <Link to={'/'}><img src={LogoImage} alt="Cloud9 logo here" className='logo--image'/></Link>
        </div>
    );
}