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
import CreateCategoryComp from "./component/CreateCategoryComp";

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
              <Route path="admin" element={<AuthMiddleware />}>
                <Route index element={<AdminComp />} />
                <Route
                  path="create-category"
                  element={<CreateCategoryComp />}
                />
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
