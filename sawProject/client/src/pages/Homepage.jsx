import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { useSnapshot } from "valtio";
import settings from "../settings/state";

// components
import Home from "../components/Home";
import AboutUs from "../components/AboutUs";
import Navbar from "../components/Navbar";

const Homepage = () => {
  const { state, userInfo } = settings;
  const snap = useSnapshot(state);

  useEffect(() => {
    document.title = snap.pageTitle;
  }, []);

  if(window.location.href.includes("#aboutus")) {
    setTimeout(() => { window.location.href = "/#aboutus"; }, 200);
    
  }


  return (
    <>
      <Navbar />
      <Home />
      <AboutUs />
    </>
  );
};

export default Homepage;
