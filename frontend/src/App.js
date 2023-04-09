import React, { useEffect } from "react";
import Navbar from "./Template/Navbar";
import HomeBody from "./HomePageBody/HomeBody";
import SignUp from "./LoginPage/SignUp";
import SignIn from "./LoginPage/SignIn";
import Verify from "./LoginPage/verify";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Logout from "./Template/logout";
import Yes from "./Template/yes";
import Profile from "./LoginPage/profile";
import About from "./HomePageBody/about";
import Flight from "./FlightSchedule/Flight";
import Book from "./Book/Book";
import Payment from "./LoginPage/payment";
import Paysucce from "./LoginPage/paysuccess";
import BookVerify from "./Verification/Verify";
import Feedback from "./Feedback/Feedback";
import Forgot from "./LoginPage/forgot";
import Manage from "./Manage/Manage";

export const UserProvider = React.createContext();
export default function App() {
  const [airport, setAirport] = React.useState([]);
  const [Loggedin, setLoggedin] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const date1 = new Date(localStorage.getItem("token"));
      const date = new Date();
      if (date1 > date) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      setLoggedin(false);
    }
  });
  return (
    <div className="body">
      <Router>
        <UserProvider.Provider
          value={{ Loggedin, setLoggedin, airport, setAirport }}
        >
          <Navbar />
          <Route exact path="/" component={HomeBody} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/verify-email/:id" component={Verify} />
          <Route path="/logout" component={Logout} />
          <Route path="/yes/:id" component={Yes} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/about" component={About} />
          <Route path="/flight-search" component={Flight} />
          <Route path="/book" component={Book} />
          <Route path="/payment" component={Payment} />
          <Route path="/success/:id" component={Paysucce} />
          <Route path="/book-ver" component={BookVerify} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/forgot/:email/:token" component={Forgot} />
          <Route path="/manage" component={Manage} />
          {/* <Route path="/*">
            <Redirect to="/" />
          </Route> */}
        </UserProvider.Provider>
      </Router>
    </div>
  );
}
