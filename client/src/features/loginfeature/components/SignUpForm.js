import React, { useState } from "react";
import Error from "../../../components/Error";

export default function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/signup", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <h1 className="page-header">Sign Up Now</h1>
      <form class="form-formatting mb-5">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingUsername"
            name="username"
            value={username}
            onChange={(e) => {
              setErrors([]);
              setUsername(e.target.value);
            }}
            placeholder="username"
          />
          <label for="floatingUsername">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setErrors([]);
              setPassword(e.target.value);
            }}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPasswordConfirmation"
            name="passwordConfirmation"
            placeholder="password"
            value={passwordConfirmation}
            onChange={(e) => {
              setErrors([]);
              setPasswordConfirmation(e.target.value);
            }}
          />
          <label for="floatingPasswordConfirmation">
            Password Confirmation
          </label>
        </div>
        <div class="text-center m-3">
          <button
            onClick={(e) => handleSubmit(e)}
            class="btn btn-success mb-0 fs-4 text"
            type="button"
          >
            Submit
          </button>
        </div>
        <div>
          {errors.map((error) => (
            <Error key={error} error={error}></Error>
          ))}
        </div>
      </form>
    </>
  );
}
