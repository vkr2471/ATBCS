import React from 'react';
import './LoginPage.css'

export default function SignUp() {
  const [signUpData, setSignUpData] = React.useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

    function HandleSubmit(event) {
        event.preventDefault();
    }

  function HandleChange(event) {
    const { name, value } = event.target;
    setSignUpData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return(
    <div class="wrapper">
        <form onSubmit={HandleSubmit} class="login-form">
        <h2 class="login-header">Register</h2>
          <div class="input-box">
              <span class='icon'>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input 
                type="text" 
                name='email'
                value={signUpData.email}
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
              value={signUpData.password}
              onChange={HandleChange} required/>
            <label>Password</label>
          </div>
          <div class="input-box">
            <span class='icon'>
                <ion-icon name="bag-check"></ion-icon>
            </span>
            <input 
              type="password" 
              name='confirmPassword'
              value={signUpData.confirmPassword}
              onChange={HandleChange} required/>
            <label>Confirm Password</label>
          </div>
          <button type='submit' class="button">Sign Up</button>
        </form>
    </div>
  )
}