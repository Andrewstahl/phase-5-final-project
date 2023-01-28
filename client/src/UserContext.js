import React, { useContext, useEffect, useState } from 'react'

const UserContext = React.createContext()
const UserLogoutContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function useUserUpdate() {
  return useContext(UserLogoutContext)
}

export function UserProvider({ children }) { 
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  function userLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <UserContext.Provider value={user}>
      <UserLogoutContext.Provider value={userLogout}>
        {children}
      </UserLogoutContext.Provider>
    </UserContext.Provider>
  )

}