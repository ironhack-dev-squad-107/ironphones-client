import React, { useState, useEffect } from "react";

import "./PhoneDetails.css";
import { getPhoneDetails } from "../api.js";

function PhoneDetails(props) {
  // the useState() hook defines a piece of state and its setState() function
  // (the empty object is the initial state)
  const [phoneItem, setPhoneItem] = useState({});
  const { params } = props.match;

  // the useEffect() hook is called automatically by React when the page loads
  // (this takes the place of componentDidMount())
  useEffect(() => {
    // get path params from React Router props
    // use the ID in path params to get the details from the backend API
    getPhoneDetails(params.phoneId).then(response => {
      // ALWAYS console.log() response.data to see what the API gave you
      console.log("Phone Details", response.data);
      // save the JSON data from the API into the state
      setPhoneItem(response.data);
    });
  }, [params.phoneId]);
  // this array tells the effect it should only get called when phoneId changes
  // (see "Conditionally Firing an Effect" https://goo.gl/TzCfqv)

  return (
    <section className="PhoneDetails">
      <h2>Phone Details</h2>

      <h3>{phoneItem.phoneModel}</h3>
      <p>
        by <i>{phoneItem.brand}</i>
      </p>
      <b>€{phoneItem.price}</b>

      <img src={phoneItem.image} alt={phoneItem.phoneModel} />

      <h4>Specs</h4>
      <p>{phoneItem.specs}</p>

      <p>Product no. {phoneItem._id}</p>
      <p>Added on {phoneItem.createdAt}</p>
    </section>
  );
}

export default PhoneDetails;
