import "./app.css";
import HomeComp from "./component/HomeComp";
import PostComp from "./component/PostComp";
import AdminComp from "./component/AdminComp";
import AuthMiddleware from "./middleware/AuthMiddleware";
import GuestMiddleware from "./middleware/GuestMiddleware";

import { AuthProvider } from "./context/AuthProvider";

// import LoginComp from "./component/LoginComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Logout from "./logout/Logout";
import GlobalMiddleware from "./middleware/GlobalMiddleware";

function App() {
  return (
    <div className="wrapper">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GlobalMiddleware />}>
              <Route index element={<HomeComp />} />
              <Route element={<GuestMiddleware />}>
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="post/:slug" element={<PostComp />} />
              <Route element={<AuthMiddleware />}>
                <Route path="admin" element={<AdminComp />} />
              </Route>

              <Route path="logout" element={<Logout />} />

              <Route element={<AuthMiddleware />}>
                <Route path="category" element={<AdminComp />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
