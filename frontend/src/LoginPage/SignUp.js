import React from 'react';

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
    <div>
        <form onSubmit={HandleSubmit}>
            <input 
            type="email" 
            placeholder='Email Address'
            name='email'
            value={signUpData.email}
            onChange={HandleChange} />
            <input 
            type="text" 
            placeholder='Username'
            name='username'
            value={signUpData.username}
            onChange={HandleChange} />
            <input 
            type="password" 
            placeholder='Password'
            name='password'
            value={signUpData.password}
            onChange={HandleChange} />
            <input 
            type="text" 
            placeholder='Confirm Password'
            name='confirmPassword'
            value={signUpData.confirmPassword}
            onChange={HandleChange} />
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}