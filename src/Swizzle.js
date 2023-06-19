import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

export const Swizzle = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  return <Routes>
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/register" element={<Register setToken={setToken} />} />

    <Route path="*" element={
  			<>
  				<NavBar token={token} setToken={setToken} />
          <ApplicationViews token={token} setToken={setToken} />
  			</>
  	} />
  </Routes>
};
