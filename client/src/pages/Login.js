import React, { useState } from "react";
import SignUpForm from "../features/login/components/SignUpForm";
import LoginForm from "../features/login/components/LoginForm";
import "../features/login/assets/login.css";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="login-page-container">
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div className="login__signup__switch__container">
            <h3>
              <span>Don't Have an Account?</span>
            </h3>
            <button
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

export default Login;
