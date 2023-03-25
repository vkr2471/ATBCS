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
                <div className='time'>
                    <label className='time-header'>Departure</label>
                    <input type="date" placeholder="Departure Date" className='date'/>
                </div>
                <div className='time'>
                    <label className='time-header'>Arrival</label>
                    <input type="date" placeholder="Return Date" id='return' className='date' disabled />
                </div>
            </form>
        </div>
    );
}