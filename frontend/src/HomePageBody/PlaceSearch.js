import React from 'react';

export default function PlaceSearch() {
    const retur = () => {
        document.getElementById('return').disabled = false;
    };
    const retu = () => {
        document.getElementById('return').disabled = true;
    }
    return (
        <div>
            <form className='form'>
                <div className='options'>
                    <input type='radio' name='option' id='one' value='one-way' onClick={retu}/>
                    <label>One Way</label>
                    <input type='radio' name='option' id='round' value='round-trip' onClick={retur}/>
                    <label>Round Trip</label>
                </div>
                <input type="text" placeholder="Source" />
                <input type="text" placeholder="Destination" />
                <input type="date" placeholder="Departure Date" />
                <input type="date" placeholder="Return Date" id='return'  disabled />
            </form>
        </div>
    );
}