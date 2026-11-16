
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("shopeaseLoggedInUser")) || null
    );
  });

  const login = (userData) => {
    localStorage.setItem(
      "shopeaseLoggedInUser",
      JSON.stringify(userData)
    );
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("shopeaseLoggedInUser");
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };

    localStorage.setItem(
      "shopeaseLoggedInUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    const existingUsers =
      JSON.parse(localStorage.getItem("shopeaseUsers")) || [];

    const updatedUsers = existingUsers.map((item) =>
      item.id === updatedUser.id
        ? { ...item, ...updatedData }
        : item
    );

    localStorage.setItem(
      "shopeaseUsers",
      JSON.stringify(updatedUsers)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
