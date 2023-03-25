import React from 'react';
import './LoginPage.css'

export default function SignUp() {
  const [signUpData, setSignUpData] = React.useState({
    name:'',
    email: '',
    phoneNumber:'',
    DOB:'',
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
    <div className="wrapper">
        <form onSubmit={HandleSubmit} className="login-form">
        <h2 className="login-header">Register</h2>
        <div className="input-box">
              <span className='icon'>
                <ion-icon name="happy"></ion-icon>
              </span>
              <input 
                type="text" 
                name='name'
                value={signUpData.name}
                onChange={HandleChange}  required/>
              <label>Name</label>
          </div>
          <div className="input-box">
              <span className='icon'>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input 
                type="text" 
                name='email'
                value={signUpData.email}
                onChange={HandleChange}  required/>
              <label>Email</label>
          </div>
          <div className="input-box">
              <span className='icon'>
                <ion-icon name="call"></ion-icon>
              </span>
              <input 
                type="text" 
                name='phoneNumber'
                value={signUpData.phoneNumber}
                onChange={HandleChange}  required/>
              <label>Phone Number</label>
          </div>
          <div className="input-box">
              <input 
                type="date" 
                name='DOB'
                value={signUpData.DOB}
                onChange={HandleChange}  required/>
          </div>
          <div className="input-box">
            <span className='icon'>
                <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input 
              type="password" 
              name='password'
              value={signUpData.password}
              onChange={HandleChange} required/>
            <label>Password</label>
          </div>
          <div className="input-box">
            <span className='icon'>
                <ion-icon name="bag-check"></ion-icon>
            </span>
            <input 
              type="password" 
              name='confirmPassword'
              value={signUpData.confirmPassword}
              onChange={HandleChange} required/>
            <label>Confirm Password</label>
          </div>
          <button type='submit' className="button">Sign Up</button>
        </form>
    </div>
  )
}