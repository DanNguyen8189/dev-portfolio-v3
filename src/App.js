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

    if (location.pathname !== "/" || !scrollTarget) {
      return;
    }

    const tryScrollToTarget = () => {
      const element = document.getElementById(scrollTarget);

      if (element) {
        window.scrollTo({ top: 0, behavior: "auto" });
        element.scrollIntoView({ behavior: "auto", block: "start" });
        navigate(location.pathname, { replace: true, state: {} });
        return true;
      }

      return false;
    };

    if (!tryScrollToTarget()) {
      const timer = window.setTimeout(() => {
        tryScrollToTarget();
      }, 150);

      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.state, navigate]);

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
