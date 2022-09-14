import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const logout = useLogout();
  const { setGuest } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("tai");
    const logoutToken = async () => {
      try {
        await logout();
      } catch (e) {
        console.clear();
        // console.log(e);
      }
    };
    logoutToken();
    setGuest(true);
    setIsLoading(false);
  });
  return isLoading ? <p>Loading...</p> : <Navigate to={"/login"} />;
};

export default Logout;
