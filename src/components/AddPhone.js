import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./AddPhone.css";
import { postPhone } from "../api.js";

class AddPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneModel: "",
      brand: "",
      price: "",
      image: "",
      specs: "",
      isSubmitSuccessful: false
    };
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // send this.state (user inputs) to the backend for SAVING!
    postPhone(this.state).then(response => {
      console.log("Add Phone", response.data);
      // update the state for our redirect
      this.setState({ isSubmitSuccessful: true });
    });
  }

  render() {
    return this.state.isSubmitSuccessful ? (
      // returning the <Redirect /> ONLY works inside RENDER
      <Redirect to="/recent-phones" />
    ) : (
      <section className="AddPhone">
        <h2>Add a Phone</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Model:{" "}
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.phoneModel}
              name="phoneModel"
              type="text"
              placeholder="iPhone Xs"
            />
          </label>

          <label>
            Brand:{" "}
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.brand}
              name="brand"
              type="text"
              placeholder="Apple"
            />
          </label>

          <label>
            Price:{" "}
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.price}
              name="price"
              type="number"
              placeholder="1155"
            />
          </label>

          <label>
            Image URL:{" "}
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.image}
              name="image"
              type="url"
              placeholder="http://example.com"
            />
          </label>

          <label>
            Specs:{" "}
            <input
              onChange={event => this.genericOnChange(event)}
              value={this.state.specs}
              name="specs"
              type="text"
              placeholder="great camera, 8 hour battery"
            />
          </label>

          <button>Submit This Phone</button>
        </form>
      </section>
    );
  }
}

export default AddPhone;
