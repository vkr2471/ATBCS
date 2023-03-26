import React, { useEffect }  from 'react';
import Navbar from './Template/Navbar';
import HomeBody from './HomePageBody/HomeBody';
import SignUp from './LoginPage/SignUp';
import SignIn from './LoginPage/SignIn';
import Verify from './LoginPage/verify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './context/context';
import { useContext } from 'react';
import Logout from './Template/logout';
import Yes from './Template/yes';


export default function App() {
  return (
    <div className="body">
      <Router>
        <UserProvider>
          <Navbar />
          <Route exact path="/" component={HomeBody} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/verify-email/:id" component={Verify} />
          <Route path="/logout" component={Logout} />
          <Route path="/yes/:id" component={Yes} />
        </UserProvider>
      </Router>
      </div>
  );
}