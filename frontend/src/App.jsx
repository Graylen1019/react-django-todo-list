import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-routes";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { NotFound } from "./pages/not-found";
import { Home } from "./pages/home";

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/Login" />;
};

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};
// Hey
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
