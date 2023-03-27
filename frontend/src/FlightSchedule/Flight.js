import React, { useEffect } from 'react';
import "./Flight.css";
import Details from './Details';
export default function Flight() {
    const [dataTable, setDataTable] = React.useState([]);
    const data=[
        {
            "_id": {
              "$oid": "641b4bbd92c312efc9ec8e06"
            },
            "date": "2023-04-28",
            "flights": [
              {
                "flightid": "KB0194",
                "source": "AHMEDABAD",
                "destination": "DELHI",
                "departure": "06:00 AM",
                "arrival": "07:45 AM",
                "totalseats": {
                  "fc": 6,
                  "bc": 12,
                  "ec": 107
                },
                "seatsbooked": {
                  "fc": 0,
                  "bc": 0,
                  "ec": 0
                },
                "ticketfare": {
                  "fc": 59088,
                  "bc": 19696,
                  "ec": 2462
                },
                "_id": {
                  "$oid": "641b4bbd92c312efc9ec8e07"
                }
              },
              {
                "flightid": "KB2971",
                "source": "AHMEDABAD",
                "destination": "JAIPUR",
                "departure": "09:25 AM",
                "arrival": "10:55 AM",
                "totalseats": {
                  "fc": 7,
                  "bc": 15,
                  "ec": 137
                },
                "seatsbooked": {
                  "fc": 0,
                  "bc": 0,
                  "ec": 0
                },
                "ticketfare": {
                  "fc": 49848,
                  "bc": 16616,
                  "ec": 2077
                }
            },
                {
                    "flightid": "KB0491",
                    "source": "AHMEDABAD",
                    "destination": "BAGDOGRA",
                    "departure": "06:10 AM",
                    "arrival": "08:40 AM",
                    "totalseats": {
                    "fc": 6,
                    "bc": 13,
                    "ec": 111
                    },
                    "seatsbooked": {
                    "fc": 0,
                    "bc": 0,
                    "ec": 0
                    },
                    "ticketfare": {
                    "fc": 104040,
                    "bc": 34680,
                    "ec": 4335
                    },
              }
            ]
        }
    ]
    const date = data[0]["date"];
    return (
        
        <div className='flights'>
            <h2 className='heading'>Flights</h2>
            <div>
                <h3 className='date'>{date}</h3>
                <h3 className='date'>Total Flights: {data[0]["flights"].length}</h3>
                <h3 className='from'>From: {data[0]['flights'][0]['source']}</h3>
                <h3 className='to'>To: {data[0]['flights'][0]['destination']}</h3>
            </div>
            <div className='flightsContainer'>
                <table>
                <thead>
                    <tr>
                        <th>FlightID</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Fees</th>
                    </tr>
                </thead>
                <tbody>
                    {data[0]["flights"].map((item,index)=><Details item={item} date={date}/>)}
                </tbody>
            </table>
            </div>

        </div>
    );
}
