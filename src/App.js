import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProjectDetailPage from "./components/ProjectDetailPage";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;

    if (location.pathname === "/" && scrollTarget) {
      const element = document.querySelector(`#${scrollTarget}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </>
  );
}
