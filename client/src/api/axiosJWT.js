import axios from "axios";
import axiosAPI from "../api/axios";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import moment from "moment";

const AxiosJWT = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const instance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use(
    async function (config) {
      const decodedHeader = jwt_decode(auth?.accessToken);

      console.log(decodedHeader?.exp < Date.now() / 1000);
      //   if (parseInt(String(decodedHeader?.exp) + "000") < Date.now()) {
      if (decodedHeader?.exp < Date.now() / 1000) {
        try {
          const c = await refresh();
          console.log(c);
          config.headers["Authorization"] = `Bearer ${c}`;
        } catch (e) {
          //   console.error("ini err");
          console.clear();
        }
        // await axios.get("refreshToken", { withCredentials: true });
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return instance;
};

export default AxiosJWT;
