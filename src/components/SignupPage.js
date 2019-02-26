import React, { Component } from "react";

import "./SignupPage.css";

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

    // send the user info to the backend...
  }

  render() {
    return (
      <section className="SignupPage">
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
      </section>
    );
  }
}

export default SignupPage;
