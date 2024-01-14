import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { useSnapshot } from "valtio";
import settings from "../settings/state";
import { Link as GoTo, animateScroll as scroll } from "react-scroll";

// components
import CustomButton from "../components/CustomButton";
import AnimatedText from "../components/AnimatedText";

const Home = () => {
  const { state, userInfo } = settings;
  const snapUser = useSnapshot(userInfo);

  const containerAnimationProps = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.01,
      },
    },
  };

  const letterAnimationProps = {
    initial: { opacity: 0, y: 20 }, // Set initial state for each letter
    animate: { opacity: 1, y: 0 }, // Set animation state for each letter
    exit: { opacity: 0, y: -20 },
  };
  return (
    <section id="home" className="w-[90%] m-auto relative">
      {/* check if snap.loggedIn is true or false from localstorage */}

      <div className="h-[98vh] w-full absolute bottom-0 flex-col align-middle">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] xl:text-[8rem] leading-tight font-['Nasastyle'] text-white uppercase"
          animate={{ x: [null, 10, 0] }} 
          transition={{ ease: "linear", duration: 1 }}
        >
          start your <br className="flex" /> new adventure
        </motion.h1>
        <div id="home" className="my-6">
          <AnimatedText
            customStyles={"text-white text-xl text-wrap"}
            text={`Embark on Infinite Journeys with Us: Your Gateway to the Stars!
                We're the pioneers in spacecraft technology, bringing the wonders of space closer to you.
                With showrooms spanning galaxies, we make space travel accessible to all.
                Join us in unraveling the mysteries of the cosmos today!`}
            containerAnimationProps={containerAnimationProps}
            letterAnimationProps={letterAnimationProps}
          />
        </div>
        
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 5, 0],
            y: [null, -10, 0],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 30,
          }}
          className="w-[100%] flex justify-center md:pt-[5%]"
        >
          <CustomButton
            customStyles={"bg-yellow-600 text-white w-fit"}
            handleClick={() => {
              window.location.href = "/forms";
            }}
            title={snapUser.loggedIn ? "Continue Adventure" : "Start Adventure"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;