import React from 'react';
import Navbar from './Template/Navbar';
import HomeBody from './HomePageBody/HomeBody';
import SignUp from './LoginPage/SignUp';
import SignIn from './LoginPage/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div class="body">
      <Router>
        <Navbar />
        <Route exact path="/" component={HomeBody} />
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
      </div>
  );
}