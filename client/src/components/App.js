import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";

/**
 * App Hierarchy
 * 
 * App
 * ├─── Postings
 *      ├─── Job Requests
 *           ├─── Job
 *           ├─── Job
 *           └─── Job
 *      └─── Gigs
 *           ├─── Gig
 *           ├─── Gig
 *           └─── Gig
 * ├─── Conversations
 *      ├─── Conversation
 *           ├─── Message
 *           ├─── Message
 *           └─── Message
 *      ├─── Conversation
 *      └─── Conversation
 * ├─── Projects
 *      ├─── Project
 *      ├─── Project
 *      └─── Project
 * ├─── Search
 *      ├─── User
 *      ├─── User
 *      └─── User
 * └─── Profile
 * 
 */

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  if (!user) return <Login />;

  return (
    <>
      <NavBar onLogoutClick={handleLogout} />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<h1>Postings</h1>} />
          <Route exact path="/conversations" element={<h1>Conversations</h1>} />
          <Route exact path="/projects" element={<h1>Projects</h1>} />
          <Route exact path="/search" element={<h1>Search</h1>} />
          <Route exact path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
