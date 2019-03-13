import { useState } from "react";

import { postFile } from "../api.js";

// useInputValue()
// ---------------
// custom hook for defining a text input's state and onChange callback function
export function useInputValue(initialValue) {
  // the useState() hook defines a piece of state and its setState() function
  // (we receive the initial state as a parameter of our custom hook)
  const [value, setValue] = useState(initialValue);

  // this function has to be INSIDE useInputValue() because it uses setValue()
  function genericOnChange(event) {
    setValue(event.target.value);
  }

  return [value, genericOnChange];
}

// useInputFile()
// --------------
// custom hook for defining a file input's state and onChange callback function
// (it uploads the file to the backend and sets the state to the URL)
export function useInputFile(initialValue) {
  // the useState() hook defines a piece of state and its setState() function
  // (we receive the initial state as a parameter of our custom hook)
  const [value, setValue] = useState(initialValue);

  // this function has to be INSIDE useInputFile() because it uses setValue()
  function uploadOnChange(event) {
    const { files } = event.target;

    postFile(files[0]).then(response => {
      console.log("Upload File Info", response.data);
      setValue(response.data.fileUrl);
    });
  }

  return [value, uploadOnChange];
}
