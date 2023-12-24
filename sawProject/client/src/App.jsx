import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/404";
import Forms from "./pages/Forms";

function App() {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/forms/*" element={<Forms />} />
        <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
