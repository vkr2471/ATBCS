import React from 'react';
import Passenger from './Person';

export default function PassengerList({flight}) {
    const now = new Date();
    return(
        <div className='passenger-list'>
            <h3>Passenger List</h3>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>First time flier</th>
                </tr>
            {flight.adult.map((adult) => {
                return(
                        <Passenger name={adult.name} age={adult.age} ftf={adult.ftf} />
                )
            })}
            {
                flight.child.length !== 0 && flight.child.map((child) => {
                    return(
                            <Passenger name={child.name} age={child.age} ftf={child.ftf} />
                    )
                }) 
            }
            {
                flight.infant.length !== 0 && flight.infant.map((infant) => {    
                    return(
                            <Passenger name={infant.name} age={infant.age} ftf={infant.ftf} />
                    )
                }) 
            }
            </table>
            <button disabled = "true">
                Cancel
            </button>
        </div>
    );
}