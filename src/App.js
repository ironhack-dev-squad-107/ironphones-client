import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import RecentPhones from "./components/RecentPhones";
import PhoneDetails from "./components/PhoneDetails";
import AddPhone from "./components/AddPhone";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

import useLocalStorage from "./hooks/useLocalStorage.js";
import { getLogOut } from "./api";

function App() {
  // get the initial value of currentUser from my localStorage hook
  // (this is a custom hook I made to make App.js more organized)
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser");

  function logoutClick() {
    getLogOut().then(response => {
      console.log("Log Out", response.data);
      // set the currentUser state to empty
      setCurrentUser(null);
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Ironphones</h1>

        <nav>
          {/* NavLink to the home page should ALWAYS have exact on it */}
          <NavLink exact to="/">
            Home
          </NavLink>

          <NavLink to="/recent-phones">New Releases</NavLink>

          {currentUser ? (
            <>
              <b>{currentUser.email}</b>
              {/* onClick doesn't need arrow functions since there's no this */}
              <button onClick={logoutClick}>Log Out</button>
            </>
          ) : (
            <>
              <NavLink to="/signup-page">Sign Up</NavLink>
              <NavLink to="/login-page">Log In</NavLink>
            </>
          )}
        </nav>
      </header>

      <Switch>
        {/* home page route should ALWAYS have exact on it */}
        <Route exact path="/" component={HomePage} />

        <Route path="/recent-phones" component={RecentPhones} />
        <Route path="/phone-details/:phoneId" component={PhoneDetails} />
        <Route path="/add-phone" component={AddPhone} />

        {/* Use render instead of component to send props */}
        <Route
          path="/signup-page"
          render={() => {
            return (
              <SignupPage
                // send App's currentUser state as a prop to SignupPage
                currentUser={currentUser}
                // send App's setCurrentUser function as prop for changing state
                // (no need for an arrow function since there's no this)
                signupSuccess={setCurrentUser}
              />
            );
          }}
        />
        <Route
          path="/login-page"
          render={() => {
            return (
              <LoginPage
                // send App's currentUser state as a prop to LoginPage
                currentUser={currentUser}
                // send App's setCurrentUser function as prop for changing state
                // (no need for an arrow function since there's no this)
                loginSuccess={setCurrentUser}
              />
            );
          }}
        />

        {/* 404 route should go LAST */}
        <Route component={NotFound} />
      </Switch>

      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="phone">
            📱
          </span>{" "}
          at Ironhack
        </p>
      </footer>
    </div>
  );
}

export default App;
