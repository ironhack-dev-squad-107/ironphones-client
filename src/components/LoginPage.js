import React, { Component } from "react";

import "./LoginPage.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    // submit login info to the backend...
  }

  render() {
    return (
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
