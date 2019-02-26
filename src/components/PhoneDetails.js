import React, { Component } from "react";

import "./PhoneDetails.css";
import { getPhoneDetails } from "../api.js";

class PhoneDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneItem: {}
    };
  }

  componentDidMount() {
    // get path params from React Router props
    const { params } = this.props.match;
    // use the ID in path params to get the details from the backend API
    getPhoneDetails(params.phoneId).then(response => {
      // ALWAYS console.log() response.data to see what the API gave you
      console.log("Phone Details", response.data);
      // save the JSON data from the API into the state
      this.setState({ phoneItem: response.data });
    });
  }

  render() {
    const { phoneItem } = this.state;
    return (
      <section className="PhoneDetails">
        <h2>Phone Details</h2>

        <h3>{phoneItem.phoneModel}</h3>
        <p>
          by <i>{phoneItem.brand}</i>
        </p>
        <b>€{phoneItem.price}</b>

        <img src={phoneItem.image} />

        <h4>Specs</h4>
        <p>{phoneItem.specs}</p>

        <p>Product no. {phoneItem._id}</p>
        <p>Added on {phoneItem.createdAt}</p>
      </section>
    );
  }
}

export default PhoneDetails;
