import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import {UserProvider} from '../App';
import { useContext  } from 'react';
import { Redirect } from 'react-router-dom';

export default function SignIn() {
  const [signInData, setSignInData] = React.useState({
    email: '',
    password: ''
  });
  const {Loggedin , setLoggedin} = useContext(UserProvider);
  async function HandleSubmit(event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/login', signInData)
        .then(async (response) => {
          console.log(response);
          const user = response.data
          localStorage.setItem('user', user.user)
          localStorage.setItem('token', user.session.cookie.expires)
          alert('Logged In Successfully')
          setLoggedin(true)
        }).catch((error) => {
          console.log(error)
          alert((error.response.data))
        })
    }

  function HandleChange(event) {
    const { name, value } = event.target;
    setSignInData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  if(Loggedin){
    return <Redirect to='/' />
  }
  return(
    <div className="wrapper">
        <form onSubmit={HandleSubmit} className="login-form">
          <h2 className="login-header">Login</h2>
          <div className="input-box">
            <span className='icon'>
              <ion-icon name="mail"></ion-icon>
            </span>
            <input 
              type="text" 
              name='email'
              value={signInData.email}
              onChange={HandleChange}  required/>
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className='icon'>
                <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input 
              type="password" 
              name='password'
              value={signInData.password}
              onChange={HandleChange} required/>
            <label>Password</label>
          </div>
          <button type='submit' className="button">Sign In</button>
          <div className="login-register">
            <p>Don't have an acccount?<Link to={'/signup'}><button type="button">Sign Up</button></Link></p>
          </div>
        </form>
    </div>
  )
}