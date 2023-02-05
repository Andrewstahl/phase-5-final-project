import React, { useState } from "react";

// import "../features/login/assets/login.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

export default function LoginIndex({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login-page-container">
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div class="text-center">
            <h3>
              <span>Don't Have an Account?</span>
            </h3>
            <button
              class="btn btn-dark"
              className="login__signup__switch__button"
              onClick={() => setShowLogin(false)}
            >
              Signup
            </button>
          </div>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <div className="login__signup__switch__container">
            <h3>
              <span>Already Have an Account?</span>
            </h3>
            <button
              className="login__signup__switch__button"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}