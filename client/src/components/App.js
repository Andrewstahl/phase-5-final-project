import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "../pages/Login";
import Postings from "../pages/Postings";
import Search from "../pages/Search";
import Conversations from "../pages/Conversations";
import Projects from "../pages/Projects";
import Profile from "../pages/Profile";
import { SystemModeProvider } from "../SystemModeContext";
import NavBar from "./NavBar";
import ScrollButton from "./ScrollToTop";

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
 *      ├─── Requested
 *           ├─── Project
 *           ├─── Project
 *           └─── Project
 *      └─── Pending
 *           ├─── Project
 *           ├─── Project
 *           └─── Project
 * ├─── Search
 *      ├─── User
 *      ├─── User
 *      └─── User
 * └─── Profile
 *
 */

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

function App() {
  const [siteMode, setSiteMode] = useState("freelancing");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleSiteToggle() {
    if (siteMode === "Freelancing") {
      setSiteMode("Buying");
    } else {
      setSiteMode("Freelancing");
    }
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <UserContext.Provider value={user}>
        <SystemModeProvider>
          <NavBar />
          {/* <NavBar
            onLogoutClick={handleLogout}
            onSiteToggle={handleSiteToggle}
          /> */}
          <div className="App">
            <Routes>
              <Route
                exact
                path="/postings"
                element={<Postings user={user} />}
              />
              <Route exact path="/search" element={<Search />} />
              <Route
                exact
                path="/conversations"
                element={<Conversations user={user} />}
              />
              <Route exact path="/projects" element={<Projects />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
            <ScrollButton />
          </div>
        </SystemModeProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
