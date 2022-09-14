import axios from "../api/axios";
import useAuth from "./useAuth";

import ls from "local-storage";
const useLogout = () => {
  const { setGuest } = useAuth();
  const { setPersist } = useAuth();
  const logout = async () => {
    setPersist(ls("persist", false));
    await axios.delete("logout", {
      withCredentials: true,
    });
    setGuest(true);
  };
  return logout;
};

export default useLogout;
