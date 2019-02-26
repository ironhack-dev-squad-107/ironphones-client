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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  updateUser(newUser) {
    this.setState({ currentUser: newUser });
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
            <NavLink to="/signup-page">Sign Up</NavLink>
            <NavLink to="/login-page">Log In</NavLink>
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
