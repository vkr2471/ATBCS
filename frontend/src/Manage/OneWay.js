import React from 'react';
import { useContext } from 'react';
import { ManageContext } from './Manage';

export default function OneWay({flight}) {
    const {data , setData} = useContext(ManageContext);
    let classType;
    if(flight.details.class === "ec"){
        classType = "Economy";
    }else if(flight.details.class === "bc"){
        classType = "Business Class";
    }else{
        classType = "First Class";
    }

    const Handleclick = (e) => {
        if(flight.display === "none"){
            flight.display = "block";
            e.target.innerHTML = "Hide";
            e.target.style.backgroundColor = "red";
        }else{
            flight.display = "none";
            e.target.innerHTML = "View";
            e.target.style.backgroundColor = "rgb(121, 227, 100)";
        }
        setData({...data});
    }
    return(
        <div className='manage-flight'>
            <h3>One-Way</h3>
            <h3>{flight.details.date}</h3>
            <h3>{flight.flight_number}</h3>
            <h3>{flight.details.from}</h3>
            <h3>{flight.details.to}</h3>
            <h3>₹{flight.fare !==undefined && flight.fare.toLocaleString("en-IN")}</h3>
            <h3>{classType}</h3>
            <button onClick={Handleclick}>View</button>
        </div>
    );
}