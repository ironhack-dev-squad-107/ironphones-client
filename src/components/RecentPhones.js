import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./RecentPhones.css";
import { getPhoneList } from "../api.js";

function RecentPhones() {
  // the useState() hook defines a piece of state and its setState() function
  // (the empty array is the initial state)
  const [phoneArray, setPhoneArray] = useState([]);

  // the useEffect() hook is called automatically by React when the page loads
  // (this takes the place of componentDidMount())
  useEffect(() => {
    // get data from our Express API (localhost:5555)
    getPhoneList().then(response => {
      // ALWAYS console.log() response.data to see what the API gave you
      console.log("Recent Phones", response.data);
      // save the JSON data from the API into the state
      setPhoneArray(response.data);
    });
  }, []);
  // this empty array at the end prevents the effect from running more than once
  // (see "Conditionally Firing an Effect" https://goo.gl/TzCfqv)

  return (
    <section className="RecentPhones">
      <h2>New Phone Releases</h2>

      <Link to="/add-phone">Submit a New Phone</Link>

      <ul>
        {phoneArray.map(onePhone => {
          return (
            <li key={onePhone._id}>
              <h3>
                <Link to={`/phone-details/${onePhone._id}`}>
                  {onePhone.phoneModel}
                </Link>
              </h3>
              <p>by {onePhone.brand}</p>
              <p>€{onePhone.price}</p>
              <img src={onePhone.image} alt={onePhone.phoneModel} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RecentPhones;
