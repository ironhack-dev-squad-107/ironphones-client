import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./RecentPhones.css";

// returns the dynamic URL for phone details
function getPhoneAddress(phone) {
  return `/phone-details/${phone._id}`;
}

class RecentPhones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneArray: []
    };
  }

  // componentDidMount() is called automatically by React when the page loads
  componentDidMount() {
    // get data from our Express API (localhost:5555)
    axios
      .get("http://localhost:5555/api/phones")
      .then(response => {
        // ALWAYS console.log() response.data to see what the API gave you
        console.log("Recent Phones", response.data);
        // save the JSON data from the API into the state
        this.setState({ phoneArray: response.data });
      })
      .catch(() => {
        alert("Sorry! There was a problem with getting the phone list data.");
      });
  }

  render() {
    const { phoneArray } = this.state;
    return (
      <section className="RecentPhones">
        <h2>New Phone Releases</h2>

        <ul>
          {phoneArray.map(onePhone => {
            return (
              <li key={onePhone._id}>
                <h3>
                  <Link to={getPhoneAddress(onePhone)}>
                    {onePhone.phoneModel}
                  </Link>
                </h3>
                <p>by {onePhone.brand}</p>
                <p>€{onePhone.price}</p>
                <img src={onePhone.image} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default RecentPhones;
