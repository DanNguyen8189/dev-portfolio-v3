import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProjectDetailPage from "./components/ProjectDetailPage";

function App() {
  // Available Colours:
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow

  // edit this variable to change the color theme
  const color = "teal";

  return (
    <BrowserRouter>
      <AppRoutes color={color} />
    </BrowserRouter>
  );
}

export default App;

function AppRoutes({ color }) {
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
      <Nav color={color} />
      <Routes>
        <Route path="/" element={<HomePage color={color} />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage color={color} />} />
      </Routes>
    </>
  );
}
