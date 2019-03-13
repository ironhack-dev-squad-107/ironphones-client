import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./AddPhone.css";
import { useInputValue, useInputFile } from "../hooks/inputs.js";
import { postPhone } from "../api.js";

function AddPhone() {
  // useInputValue() is a custom hook I made for inputs you type in
  // (this way we don't need to copy/paste the genericOnChange() function)
  const [phoneModel, onPhoneModelChange] = useInputValue("");
  const [brand, onBrandChange] = useInputValue("");
  const [price, onPriceChange] = useInputValue("");
  const [specs, onSpecsChange] = useInputValue("");

  // useInputFile() is another custom hook specifically for file inputs
  // (this way we don't need to copy/paste the uploadOnChange() function)
  const [image, onImageChange] = useInputFile("");

  // the useState() hook defines a piece of state and its setState() function
  // (false is the initial state)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  if (isSubmitSuccessful) {
    // a function component is a big render so we can return Redirect anywhere
    // (we can only do our return after all of our hooks are declared)
    return <Redirect to="/recent-phones" />;
  }

  // this function has to be INSIDE because it uses the state
  function handleSubmit(event) {
    event.preventDefault();

    // send user inputs to the backend for SAVING!
    postPhone({ phoneModel, brand, price, image, specs }).then(response => {
      console.log("Add Phone", response.data);
      // update the state for our redirect
      setIsSubmitSuccessful(true);
    });
  }

  return (
    <section className="AddPhone">
      <h2>Add a Phone</h2>

      {/* onSubmit doesn't need arrow functions since there's no this
       * (also we don't have a state object so we don't need input names)
       */}
      <form onSubmit={handleSubmit}>
        <label>
          Model:
          <input
            onChange={onPhoneModelChange}
            value={phoneModel}
            type="text"
            placeholder="iPhone Xs"
          />
        </label>

        <label>
          Brand:
          <input
            onChange={onBrandChange}
            value={brand}
            type="text"
            placeholder="Apple"
          />
        </label>

        <label>
          Price:
          <input
            onChange={onPriceChange}
            value={price}
            type="number"
            placeholder="1155"
          />
        </label>

        <label>
          Image:
          <input onChange={onImageChange} type="file" />
        </label>
        <img src={image} alt={phoneModel} />

        <label>
          Specs:
          <input
            onChange={onSpecsChange}
            value={specs}
            type="text"
            placeholder="great camera, 8 hour battery"
          />
        </label>

        <button>Submit This Phone</button>
      </form>
    </section>
  );
}

export default AddPhone;
