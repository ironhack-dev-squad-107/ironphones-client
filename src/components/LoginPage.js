import React from "react";
import { Redirect } from "react-router-dom";

import "./LoginPage.css";
import { useInputValue } from "../hooks/inputs.js";
import { postLogIn } from "../api.js";

function LoginPage(props) {
  // useInputValue() is a custom hook I made for inputs you type in
  // (this way we don't need to copy/paste the genericOnChange() function)
  const [email, onEmailChange] = useInputValue("");
  const [originalPassword, onPasswordChange] = useInputValue("");

  // currentUser is now sent by App.js as a prop
  const { currentUser, loginSuccess } = props;
  if (currentUser) {
    // a function component is a big render so we can return Redirect anywhere
    // (we can only do our return after all of our hooks are declared)
    return <Redirect to="/recent-phones" />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    postLogIn({ email, originalPassword }).then(response => {
      console.log("Log In", response.data);
      // use the method sent as a prop by App.js to update currentUser
      loginSuccess(response.data);
    });
  }

  return (
    <section className="LoginPage">
      <h2>Log In</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            onChange={onEmailChange}
            value={email}
            type="email"
            placeholder="rose@tico.com"
          />
        </label>

        <label>
          Password
          <input
            onChange={onPasswordChange}
            value={originalPassword}
            type="password"
            placeholder="f1nn ru13z"
          />
        </label>

        <button>Log In</button>
      </form>
    </section>
  );
}

export default LoginPage;
