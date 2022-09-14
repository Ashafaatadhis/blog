import React, { useEffect, useState, useContext } from "react";

import useRefreshToken from "../hooks/useRefreshToken";

import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PersistLoginMiddleware = () => {
  const { auth, setAuth, persist } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  //   useEffect(() => {
  //     const getToken = async () => {
  //       console.log("hai");
  //       setIsLoading(true);
  //       const newToken = await refresh();
  //       setAuth({ data: newToken });
  //       setIsLoading(false);
  //       console.log("asfdsf", auth);
  //       console.log(newToken);
  //     };
  //     getToken();
  //   }, []);

  useEffect(() => {
    // const verifyRefreshToken = async () => {
    //   try {
    //     const c = await refresh();
    //     console.log(c);
    //   } catch (e) {
    //     // console.error(e);
    //     // console.clear();
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // !persist ? :
    // console.log("ini persist", !persist);
    console.log(persist);
    if (persist) {
      //   console.log("cok");
      setIsLoading(false);
    } else {
      setAuth({});
      setIsLoading(false);
    }
  }, []);

  //   useEffect(() => {
  //     console.log("laoding");
  //     console.log(auth);
  //   }, [isLoading]);

  //   useEffect(() => {
  //     console.log(auth);
  //     const getToken = async () => {
  //       console.log("hai");
  //       const newToken = await refresh();
  //       //   setAuth();
  //       console.log(newToken);
  //     };
  //     getToken();
  //   }, []);.;zclllllll
  //   console.log("inii", auth);
  //   console.log(persist);
  //   console.log("loading", isLoading);
  return isLoading ? <p>Loading</p> : <Outlet />;
  //   return isLoading ? <p>Loading</p> : <Outlet />;

  // return isLoading ? null : auth?.accessToken ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={"/login"} />
  // );
};

export default PersistLoginMiddleware;
