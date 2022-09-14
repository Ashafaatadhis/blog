import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ls from "local-storage";
import useRefreshToken from "../hooks/useRefreshToken";
import useLogout from "../hooks/useLogout";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestMiddleware = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { persist, setPersist } = useAuth();
  const { guest, setGuest } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const refresh = useRefreshToken();
  const logout = useLogout();
  useEffect(() => {
    console.log("ini", guest);
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        // console.error(e);

        setPersist(ls("persist", false));
        setIsGuest(true);

        console.clear();
      } finally {
        setIsLoading(false);
      }
    };
    const logoutToken = async () => {
      try {
        await logout();
      } catch (e) {
        console.clear();
      }
    };
    // console.log("haloo", auth);
    // console.log(!persist);
    if (persist) {
      // !isGuest ? verifyRefreshToken() : setIsLoading(false);
      setIsLoading(false);
    } else {
      logoutToken();

      setIsGuest((prev) => !prev);
      setGuest(true);
      setIsLoading(false);
    }

    // !auth?.data?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? null : guest ? <Outlet /> : <Navigate to={"/admin"} />;

  //   return isLoading ? null : auth?.accessToken ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to={"/login"} />
  //   );
};

export default GuestMiddleware;
