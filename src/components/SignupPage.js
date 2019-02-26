import React, { Component } from "react";

import "./SignupPage.css";
import { postSignUp } from "../api.js";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      originalPassword: ""
    };
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    postSignUp(this.state).then(response => {
      console.log("Sign Up Result", response.data);
      // use the method sent as a prop by App.js to update currentUser
      this.props.signupSuccess(response.data);
    });
  }

  render() {
    // currentUser is now sent by App.js as a prop
    const { currentUser } = this.props;
    return (
      <section className="SignupPage">
        {currentUser ? (
          <div>
            <h2>You are signed up!</h2>
            <p>
              Welcome, {currentUser.fullName}! Your user ID is{" "}
              <b>{currentUser._id}</b>.
            </p>
          </div>
        ) : (
          <div>
            <h2>Sign Up</h2>

            <form onSubmit={event => this.handleSubmit(event)}>
              <label>
                Full Name:
                <input
                  onChange={event => this.genericOnChange(event)}
                  value={this.state.fullName}
                  name="fullName"
                  type="text"
                  placeholder="Rey"
                />
              </label>

              <label>
                Email:
                <input
                  onChange={event => this.genericOnChange(event)}
                  value={this.state.email}
                  name="email"
                  type="email"
                  placeholder="rey@jedi.com"
                />
              </label>

              <label>
                Password:
                <input
                  onChange={event => this.genericOnChange(event)}
                  value={this.state.originalPassword}
                  name="originalPassword"
                  type="password"
                  placeholder="It's a secret..."
                />
              </label>

              <button>Sign Up</button>
            </form>
          </div>
        )}
      </section>
    );
  }
}

export default SignupPage;
