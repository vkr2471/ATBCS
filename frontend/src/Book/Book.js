import React from "react";
import Adult from "./Adult";
import Children from "./Children";
import Infant from "./Infant";
import "./Book.css";

export default function Book(props) {
    const [Details, setDetails] = React.useState(
        props.location.state.details
    )
    console.log(Details)
    return (
        <div className="book-wrapper">
            <form>
            <h1 className="book-wrapper-header">Book a Ticket</h1>
                {[...Array(Details.adults)].map((e, i) => {
                    console.log(i);
                    return(
                        <div>
                            <h3 className="adult-header">Adult {i+1}</h3>
                            <Adult />
                        </div>
                    )
                })}
                {[...Array(Details.children)].map((e, i) => {
                    return(
                        <div>
                            <h3 className="child-header">Child {i+1}</h3>
                            <Children />
                        </div>
                    )
                })}
                {[...Array(Details.infants)].map((e, i) => {
                    return(
                        <div>
                            <h3 className="infant-header">Infant {i+1}</h3>
                            <Infant />
                        </div>
                    )
                })}
                <button type="submit" className="submit-button">Book</button>
            </form>
        </div>
    );
}