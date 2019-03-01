import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./AddPhone.css";
import { postPhone, postFile } from "../api.js";

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

  uploadOnChange(event) {
    const { name, files } = event.target;

    postFile(files).then(response => {
      console.log("Upload File Info", response.data);
      this.setState({ [name]: response.data.fileUrl });
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
            Image:{" "}
            <input
              onChange={event => this.uploadOnChange(event)}
              name="image"
              type="file"
            />
          </label>
          <img src={this.state.image} />

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
