import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function SignIn() {
  const [signInData, setSignInData] = React.useState({
    email: '',
    password: ''
  });

    function HandleSubmit(event) {
        event.preventDefault();
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

  return(
    <div class="wrapper">
        <form onSubmit={HandleSubmit} class="login-form">
          <h2 class="login-header">Login</h2>
          <div class="input-box">
            <span class='icon'>
              <ion-icon name="mail"></ion-icon>
            </span>
            <input 
              type="text" 
              name='email'
              value={signInData.email}
              onChange={HandleChange}  required/>
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class='icon'>
                <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input 
              type="password" 
              name='password'
              value={signInData.password}
              onChange={HandleChange} required/>
            <label>Password</label>
          </div>
          <button type='submit' class="button">Sign In</button>
          <div class="login-register">
            <p>Don't have an acccount?<Link to={'/signup'}><button type="button">Sign Up</button></Link></p>
          </div>
        </form>
    </div>
  )
}