// api.js
// - allows us to handle our API catch() all in one place
// - allows us to define settings for all our API requests
// - allows us to define reusable API functions

import axios from "axios";

// create an Axios object with pre-configured settings
const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // send cookies to the backend on every request (for logged-in users)
  withCredentials: true
});

function errorHandler(err) {
  // console.log() error info for debugging
  if (err.response && err.response.data) {
    console.log("API Error", err.response.data);
  } else {
    console.log("React Code Error", err);
  }

  // alert a generic message for the user
  alert("Sorry! Something went wrong. Try again later.");

  // cause the error again so the .then() won't be called
  throw err;
}

export function getPhoneList() {
  return backendApi.get("/api/phones").catch(errorHandler);
}

export function getPhoneDetails(phoneId) {
  return backendApi.get(`/api/phones/${phoneId}`).catch(errorHandler);
}

export function postPhone(newPhoneSubmission) {
  return backendApi.post("/api/phones", newPhoneSubmission).catch(errorHandler);
}

export function postSignUp(userSubmission) {
  return backendApi
    .post("/api/process-signup", userSubmission)
    .catch(errorHandler);
}

export function postLogIn(loginCredentials) {
  return backendApi
    .post("/api/process-login", loginCredentials)
    .catch(errorHandler);
}

export function getLogOut() {
  return backendApi.get("/api/logout").catch(errorHandler);
}

export function postFile(file) {
  // create a FormData object that packages up the file for uploading
  const uploadData = new FormData();
  // add the first file to the uploadData "package"
  // (the name "userFile" is the one the backend is expecting)
  uploadData.append("userFile", file);

  return backendApi.post("/api/single-upload", uploadData).catch(errorHandler);
}
