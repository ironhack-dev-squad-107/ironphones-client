import { useState } from "react";

function useLocalStorage(key) {
  // the useState() arrow function defines how to get the initial state
  const [state, setState] = useState(() => {
    let initialState = localStorage.getItem(key);
    if (initialState !== null) {
      // parse the JSON string back into an object if it's there
      initialState = JSON.parse(initialState);
    }
    return initialState;
  });

  function storeAndSetState(newState) {
    if (newState !== null) {
      // save the state in localStorage if it's being updated
      // (turn it into a JSON string before we save)
      localStorage.setItem(key, JSON.stringify(newState));
    } else {
      // delete the state from localStorage if we are removing it
      localStorage.removeItem(key);
    }
    setState(newState);
  }

  return [state, storeAndSetState];
}

export default useLocalStorage;
