import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserProvider} from '../App';

export default function Login() {
    const {Loggedin} = useContext(UserProvider);
    return (
        <div className='buttons'>
            <button type='button' className='title-login'>Manage</button>
            <Link to={'/about'}><button type='button' className='title-login'>About us</button></Link>
            {Loggedin?<Link to={'/logout'}><button type='button' className='title-login'>Logout</button></Link>:<Link to={'/login'}><button type='button' className='title-login'>Login</button></Link>}
        </div>
    );
}