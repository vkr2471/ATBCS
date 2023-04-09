import React, { useEffect } from "react";
import { useContext , useState } from "react";
import { UserProvider } from "../App";
import { createContext } from "react";
import { Redirect } from "react-router-dom";
import OneWay from "./OneWay";
import TwoWay from "./TwoWay";
import axios from "axios";
import "./Manage.css";
import PassengerList from "./PassengerList";

export const ManageContext = createContext();

export default function Manage() {
  const { Loggedin } = useContext(UserProvider);
  const [data , setData] = useState({})
  const [ dates , setDates] = useState([ ])
  const url = `http://localhost:5002/bookings/${localStorage.getItem("user")}`
  useEffect(()=>{
    axios.get(url)
    .then(res => {
      console.log(res.data);
      setData(res.data.bookings)
      setDates(Object.keys(res.data.bookings))
    })
    .catch(err => console.log(err))
  },[])
  if (!Loggedin) {
    return <Redirect to="/login" />;
  }
  return (
    <ManageContext.Provider value={{data , setData}}>
    <div className="manage">
      {
        dates.length === 0 ? <h1 className="manage-header">No Bookings</h1> : dates.map((date) => {
          return (
            <div>
              <h1 className="manage-header">Your Bookings</h1>
              {
                data[date].map((flight) => {
                  if(flight.details.option === "one-way"){
                    return (
                      <div>
                        <OneWay flight={flight} />
                        <div style={{display: flight.display}}>
                          <PassengerList flight={flight} />
                        </div>
                      </div>
                    )
                  }
                  else {
                    return (
                      <div>
                        <TwoWay flight={flight} />
                        <div style={{display: flight.display}}>
                          <PassengerList flight={flight} />
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>
          )
        })
      }
    </div>
    </ManageContext.Provider>
  );
}
