import React from 'react';
import Navbar from './Template/Navbar';
import HomeBody from './HomePageBody/HomeBody';
import SignUp from './LoginPage/SignUp';
import SignIn from './LoginPage/SignIn';

export default function App() {
  return (
    <div class="body">
      <Navbar />
      <HomeBody />
    </div>
  );
}