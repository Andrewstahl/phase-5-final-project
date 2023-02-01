import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Postings from "../pages/Postings";
import Search from "../pages/Search";
import Conversations from "../pages/Conversations";
import { useUser, UserProvider, useUserLogout } from "../UserContext";
import { SystemModeProvider } from "../SystemModeContext";

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

function App() {
  // const [user, setUser] = useState(null);
  const [siteMode, setSiteMode] = useState("freelancing");
  const user = useUser()
  const userLogout = useUserLogout()

  function handleSiteToggle() {
    if (siteMode === "Freelancing") {
      setSiteMode("Buying");
    } else {
      setSiteMode("Freelancing");
    }
  }

  if (!user) return <Login />;

  return (
    <>
      <UserProvider>
        <SystemModeProvider>
          <NavBar onLogoutClick={userLogout} onSiteToggle={handleSiteToggle} />
          <div className="App">
            <Routes>
              {/* <Route exact path={`/postings/${siteMode}`} element={<Postings user={user} />} /> */}
              <Route exact path="/postings" element={<Postings user={user} />} />
              <Route exact path="/search" element={<Search user={user} />} />
              <Route
                exact
                path="/conversations"
                element={<Conversations user={user} />}
              />
              <Route exact path="/projects" element={<h1>Projects</h1>} />
              <Route exact path="/profile" element={<h1>Profile</h1>} />
            </Routes>
          </div>
        </SystemModeProvider>
      </UserProvider>
    </>
  );
}

export default App;
