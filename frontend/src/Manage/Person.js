import React from 'react';

export default function Passenger(props) {
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.age}</td>
            {props.ftf ? <td>Yes</td> : <td>No</td>}
        </tr>
    );
}