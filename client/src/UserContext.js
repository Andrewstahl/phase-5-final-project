import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();
const UserLoginContext = React.createContext();
const UserLogoutContext = React.createContext();
const UsersContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserLogout() {
  return useContext(UserLogoutContext);
}

export function useUserLogin() {
  return useContext(UserLoginContext);
}

export function useUsers() {
  return useContext(UsersContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/users").then((r) => {
      if (r.ok) {
        r.json().then((users) => setUsers(users));
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

  function userLogin() {
    
  }

  return (
    <UserContext.Provider value={user}>
      <UserLogoutContext.Provider value={userLogout}>
        <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
      </UserLogoutContext.Provider>
    </UserContext.Provider>
  );
}
