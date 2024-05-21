import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { useAuth, useLogin, useSignup } from "./zustand/authStore";

export default function App() {
  const { data } = useAuthContext() ?? {};
  const location = useLocation();
  const { setFormDataSignup } = useSignup();
  const { setFormDataLogin } = useLogin();
  const { setErrorMsg } = useAuth();

  useEffect(() => {
    function removeState() {
      setFormDataSignup({
        confirmPassword: "",
        fullName: "",
        gender: "",
        password: "",
        username: "",
      });
      setFormDataLogin({
        confirmPassword: "",
        password: "",
        username: "",
      });

      setErrorMsg("");
    }

    return removeState();
  }, [location.pathname, setFormDataSignup, setFormDataLogin, setErrorMsg]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={data ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={data ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={data ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
    </div>
  );
}
