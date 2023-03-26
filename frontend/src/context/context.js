import React , { createContext , useEffect } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [Loggedin , setLoggedin ] = React.useState(false)
    var date1 = new Date();
    const date = new Date();
    if(localStorage.getItem('token') !== null){
    date1 = new Date(localStorage.getItem('token'));
    }
    useEffect(()=>{
        if(date1 > date){
            setLoggedin(true)
            console.log('Logged in');
        }else{
            setLoggedin(false)
            console.log('Logged out');
        }
    })

    return (
        <UserContext.Provider value={{ Loggedin, setLoggedin }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
