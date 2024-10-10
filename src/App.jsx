import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import { verify } from "./api/api";
import Homepage from "./components/Homepage";
import { Notfound } from "./components/Notfound";
import Navbar from "./components/Navbar";
import MakeAReserve from "./components/MakeAReserve";

function App() {
  const [user, setLoginUser] = useState({});
  const [token, setToken] = useState("");
  const isAuthenticated = user?._id && user;

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    const storedToken = localStorage.getItem("token");

    const verifyToken = async () => {
      const response = await verify("/user/verify");
      if (response.data) {
        setLoginUser(response.data.user);
        setToken(storedToken);
      } else {
        localStorage.removeItem("token");
      }
    };
    verifyToken();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Navbar
                    setLoginUser={setLoginUser}
                    setToken={setToken}
                    user={user}
                  />
                  <Outlet />
                </>
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          >
            <Route
              index
              element={
                isAuthenticated ? (
                  <Homepage
                    setLoginUser={setLoginUser}
                    setToken={setToken}
                    user={user}
                  />
                ) : (
                  <Login setLoginUser={setLoginUser} />
                )
              }
            />{" "}
            <Route
              path="nova-reserva"
              element={
                isAuthenticated ? (
                  <MakeAReserve
                    setLoginUser={setLoginUser}
                    setToken={setToken}
                    user={user}
                  />
                ) : (
                  <Login setLoginUser={setLoginUser} />
                )
              }
            />
            <Route
              path="login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setLoginUser={setLoginUser} />
                )
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="404" element={<Notfound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
