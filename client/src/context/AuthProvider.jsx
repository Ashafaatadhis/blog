import React, { createContext, useState } from "react";
import ls from "local-storage";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //   const token = await refresh();
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(ls("persist"));
  const [guest, setGuest] = useState(true);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, guest, setGuest }}
    >
      {children}
    </AuthContext.Provider>
  );
};
