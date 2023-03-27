import React from "react";
export default function Details(props){
    return(
        <tr>
            <td>{props.date}</td>
            <td>{props.item["source"]}</td>
            <td>{props.item["destination"]}</td>
            <td>{props.item["flightid"]}</td>
            <td>{props.item["departure"]}</td>
            <td>{props.item["arrival"]}</td>
            <td>{props.item["ticketfare"]["fc"]}</td>
        </tr>
    );
}
