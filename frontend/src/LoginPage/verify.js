import axios from "axios";
import React, { useState  } from "react";
import {  useParams , Redirect } from "react-router-dom";

export default function Verify() {
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    console.log(useParams().id);
    const a = useParams().id;
    
    async function verifyEmail() {
        await axios
        .get(`http://localhost:5002/verify-email/${a}`)
        .then((response) => {
            console.log(response);
            setVerified(true);
        })
        .catch((error) => {
            console.log(error);
            setError(true);
            setErrorMessage(error.response.data);
        });
    }
    
    verifyEmail();
    
    if (verified) {
        return <Redirect to="/login" />;
    } else if (error) {
        return <div>{errorMessage}</div>;
    } else {
        return <div>Verifying...</div>;
    }
}
