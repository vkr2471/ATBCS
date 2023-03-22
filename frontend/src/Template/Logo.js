import React from 'react';
import LogoImage from './Cloud9logo.png';

export default function Logo() {
    return (
        <div>
            <img src={LogoImage} alt="Cloud9 logo here" className='logo--image'/>
        </div>
    );
}