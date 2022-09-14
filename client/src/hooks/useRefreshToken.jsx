import axios from "../api/axios";
import { useContext } from "react";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { setAuth, setGuest } = useAuth();

  const refresh = async () => {
    const get = await axios.get("refreshToken", {
      withCredentials: true,
    });
    // get.data;
    //   console.log(get.data);

    //   setAuth({ data: get.data.accessToken });
    setAuth((prev) => {
      return { ...prev, accessToken: get.data.accessToken };
    });
    setGuest(false);

    return get.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
