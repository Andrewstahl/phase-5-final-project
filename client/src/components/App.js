import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then((user) => setUser(user));
  }, []);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    }); 
  }

  if (!user) return <Login />
  // return <Login />

  return (
    <>
      <NavBar onLogoutClick={handleLogout}/>
      <div className="App">
        <Routes>
          <Route exact path="/" element={
            <h1>Page Count: {count}</h1>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;