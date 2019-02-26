import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import RecentPhones from "./components/RecentPhones";
import PhoneDetails from "./components/PhoneDetails";
import AddPhone from "./components/AddPhone";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { getLogOut } from "./api";

class App extends Component {
  constructor(props) {
    super(props);

    // get the initial value of currentUser from localStorage
    let userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      // turn the string back into an object if we are logged in
      userInfo = JSON.parse(userInfo);
    }
    this.state = {
      currentUser: userInfo
    };
  }

  updateUser(newUser) {
    if (newUser) {
      // save the user info in localStorage if we are logging IN
      // (turn it into a JSON string before we save)
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      // delete the user info from localStorage if we are logging OUT
      localStorage.removeItem("currentUser");
    }
    this.setState({ currentUser: newUser });
  }

  logoutClick() {
    getLogOut().then(response => {
      console.log("Log Out", response.data);
      // set the currentUser state to empty
      this.updateUser(null);
    });
  }

  render() {
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

            {this.state.currentUser ? (
              <span>
                <b>{this.state.currentUser.email}</b>
                <button onClick={() => this.logoutClick()}>Log Out</button>
              </span>
            ) : (
              <span>
                <NavLink to="/signup-page">Sign Up</NavLink>
                <NavLink to="/login-page">Log In</NavLink>
              </span>
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
                  currentUser={this.state.currentUser}
                  // send App's updateUser() method as a prop for updating state
                  signupSuccess={user => this.updateUser(user)}
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
                  currentUser={this.state.currentUser}
                  // send App's updateUser() method as a prop for updating state
                  loginSuccess={user => this.updateUser(user)}
                />
              );
            }}
          />

          {/* 404 route should go LAST */}
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with 📱 at Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;
