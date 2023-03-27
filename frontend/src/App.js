import React, { useEffect }  from 'react';
import Navbar from './Template/Navbar';
import HomeBody from './HomePageBody/HomeBody';
import SignUp from './LoginPage/SignUp';
import SignIn from './LoginPage/SignIn';
import Verify from './LoginPage/verify';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logout from './Template/logout';
import Yes from './Template/yes';

export const UserProvider = React.createContext();

export default function App() {
  const [Loggedin, setLoggedin] = React.useState(false);
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
    <div className="body">
      <Router>
        <UserProvider.Provider value={{Loggedin,setLoggedin}}>
          <Navbar />
          <Route exact path="/" component={HomeBody} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/verify-email/:id" component={Verify} />
          <Route path="/logout" component={Logout} />
          <Route path="/yes/:id" component={Yes} />
        </UserProvider.Provider>
      </Router>
      </div>
  );
}

