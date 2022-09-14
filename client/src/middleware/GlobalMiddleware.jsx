import React, { useEffect, useState, useContext } from "react";

import useRefreshToken from "../hooks/useRefreshToken";

import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GlobalMiddleware = () => {
  const { auth, setGuest, persist } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  useEffect(() => {
    console.log(auth);
    const verifyRefreshToken = async () => {
      try {
        const c = await refresh();
        console.log(c);
      } catch (e) {
        // console.error(e);
        console.clear();
      } finally {
        setIsLoading(false);
      }
    };
    console.log(persist);
    if (persist) {
      !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);
  console.log(auth);
  return !isLoading && <Outlet />;
};

export default GlobalMiddleware;
