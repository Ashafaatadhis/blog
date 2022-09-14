import React, { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import ls from "local-storage";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth, persist, setPersist } = useAuth();
  const [msg, setMsg] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  useEffect(() => {
    setPersist(ls("persist", false));
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await axios.get("http://localhost:3001/refreshToken", {
  //         withCredentials: true,
  //       });
  //       navigate("/admin");
  //     } catch (e) {
  //       console.clear();
  //     }
  //   })();
  // }, []);

  const handlerUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlerCheckbox = (e) => {
    setPersist(ls("persist", e.target.checked));
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setAuth({ ...result.data });

      return navigate("/admin");
    } catch (e) {
      // console.log(e);
      // console.log(e.response.data);
      setMsg({ error: true, msg: e.response.data.msg });
      console.clear();
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="bungkus">
        <h1>Login</h1>

        {msg.error && <p>{msg.msg}</p>}
        <form onSubmit={handlerSubmit}>
          <input
            id="username"
            type="text"
            onChange={handlerUsername}
            placeholder="username"
            value={username}
          />
          <input
            id="password"
            type="password"
            onChange={handlerPassword}
            value={password}
            placeholder="password"
          />
          <div className="check">
            <input
              type="checkbox"
              className="trust"
              onChange={handlerCheckbox}
              id="trust"
            />
            <label htmlFor="trust" className="trust">
              Trust this device
            </label>
          </div>

          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
