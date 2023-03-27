import React , { useContext , useEffect} from 'react';
import PlaceSearch from './PlaceSearch';
import './HomeBody.css';
import { UserProvider } from '../App';

export default function HomeBody() {
    const { Loggedin , setLoggedin } = useContext(UserProvider);
    useEffect(() => {
    if(localStorage.getItem('token') !== null ){
        const date1 = new Date(localStorage.getItem('token'));
        const date = new Date();
        if(date1 > date){
            setLoggedin(true)
            console.log('Logged in');
        }else{
            setLoggedin(false)
            console.log('Logged out');
        }
    }else{
        setLoggedin(false)
    }})
    return (
        <div className='home-body'>
            <PlaceSearch />
        </div>
    );
}