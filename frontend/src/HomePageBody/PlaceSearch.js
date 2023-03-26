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
                <fieldset className="place">
                    <legend>From</legend>
                    <input type="text" placeholder="City or Airport" className = 'textbox' />
                </fieldset>
                <fieldset className='place'>
                    <legend>To</legend>
                    <input type="text" placeholder="City or Airport" className = 'textbox' />
                </fieldset>
                <fieldset className='time'>
                    <legend className='time-header'>Travel date</legend>
                    <input type="date" placeholder="Departure Date" className='date'/>
                    <p>-</p>
                    <input type="date" placeholder="Return Date" id='return' className='date' disabled />
                </fieldset>
            </form>
        </div>
    );
}