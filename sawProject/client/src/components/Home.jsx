import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSnapshot } from "valtio";

// settings
import settings from "../settings/state";

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
    <section id="home" className="h-screen w-screen">
      {/* check if snap.loggedIn is true or false from localstorage */}

      <div className="text-white w-[95%] mx-auto pt-20 sm:pt-22 md:pt-24">
        <motion.h1
          className="uppercase text-4xl sm:text-7xl md:text-8xl xl:text-9xl font-[Nasastyle]"
          animate={{ x: [null, 10, 0] }}
          transition={{ ease: "linear", duration: 1 }}
        >
          start your <br className="" /> new adventure
        </motion.h1>
        <div id="home" className="mt-4">
          <AnimatedText
            customStyles={"text-xl text-wrap"}
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
          className="w-full flex items-center justify-center mt-12 md:mt-24"
        >
          <CustomButton
            customStyles={"bg-yellow-600 text-white w-fit p-2 px-4 md:px-6 rounded-md"}
            handleClick={() => {
              window.location.href = "/shop";
            }}
            title={snapUser.loggedIn ? "Continue Adventure" : "Start Adventure"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
