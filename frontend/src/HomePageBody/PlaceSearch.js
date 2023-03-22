import React from 'react';

export default function PlaceSearch() {
    return (
        <div>
            <p></p>
            <ul className='body--inputs'>
                <li><p>From<input type='text' placeholder='Source' className='input'/></p></li>
                <li><p>To<input type='text' placeholder='Destination' className='input'/></p></li>
            </ul>
        </div>
    );
}