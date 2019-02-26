import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./LoginPage.css";
import { postLogIn } from "../api.js";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      originalPassword: "",
      currentUser: null
    };
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    postLogIn(this.state).then(response => {
      console.log("Log In", response.data);
      this.setState({ currentUser: response.data });
    });
  }

  render() {
    return this.state.currentUser ? (
      // returning the <Redirect /> ONLY works inside RENDER
      <Redirect to="/recent-phones" />
    ) : (
      <section className="LoginPage">
        <h2>Log In</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Email:
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.email}
              name="email"
              type="email"
              placeholder="rose@tico.com"
            />
          </label>

          <label>
            Password
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.originalPassword}
              name="originalPassword"
              type="password"
              placeholder="f1nn ru13z"
            />
          </label>

          <button>Log In</button>
        </form>
      </section>
    );
  }
}

export default LoginPage;
