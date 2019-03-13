import React from "react";

import "./SignupPage.css";
import { useInputValue } from "../hooks/inputs.js";
import { postSignUp } from "../api.js";

function SignupPage(props) {
  // useInputValue() is a custom hook I made for inputs you type in
  // (this way we don't need to copy/paste the genericOnChange() function)
  const [fullName, onFullNameChange] = useInputValue("");
  const [email, onEmailChange] = useInputValue("");
  const [originalPassword, onPasswordChange] = useInputValue("");

  // currentUser is now sent by App.js as a prop
  const { currentUser, signupSuccess } = props;

  // this function has to be INSIDE because it uses the state
  function handleSubmit(event) {
    event.preventDefault();

    postSignUp({ fullName, email, originalPassword }).then(response => {
      console.log("Sign Up Result", response.data);
      // use the method sent as a prop by App.js to update currentUser
      signupSuccess(response.data);
    });
  }

  return (
    <section className="SignupPage">
      {currentUser ? (
        <>
          <h2>You are signed up!</h2>
          <p>
            Welcome, {currentUser.fullName}! Your user ID is{" "}
            <b>{currentUser._id}</b>.
          </p>
        </>
      ) : (
        <>
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                onChange={onFullNameChange}
                value={fullName}
                type="text"
                placeholder="Rey"
              />
            </label>

            <label>
              Email:
              <input
                onChange={onEmailChange}
                value={email}
                type="email"
                placeholder="rey@jedi.com"
              />
            </label>

            <label>
              Password:
              <input
                onChange={onPasswordChange}
                value={originalPassword}
                type="password"
                placeholder="It's a secret..."
              />
            </label>

            <button>Sign Up</button>
          </form>
        </>
      )}
    </section>
  );
}

export default SignupPage;
