import React, { useState, createContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState();
  const [user, setUser] = useState("");

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
