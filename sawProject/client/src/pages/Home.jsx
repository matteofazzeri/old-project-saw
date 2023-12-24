import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { useSnapshot } from "valtio";
import settings from "../settings/state";

import Navbar from "../components/Navbar";

const Home = () => {
  const {state, userInfo} = settings;

  const snap = useSnapshot(state);
  const snapUser = useSnapshot(userInfo);

  useEffect(() => {
    document.title = snap.pageTitle;
  }, [] );

  return (
    <>
      {snap.pageTitle === "home" && (
        <Wrapper>
          {/* check if snap.loggedIn is true or false from localstorage */}
          
          {snapUser.loggedIn ? (
            <Navbar
              nextPage={"store"}
              txt={"Shop"}
              btnStyleCustom={"start-btn"}
            />
          ) : (
            <Navbar
              nextPage={"forms"}
              txt={"Start Explore"}
              btnStyleCustom={
                "bg-yellow-500 text-black hover:bg-yellow-600 focus:bg-yellow-700 start-btn"
              }
            />
          )}

          <motion.h1
            animate={{ x: [null, 10, 0] }}
            transition={{ ease: "linear", duration: 1 }}
          >
            start your <br /> new adventure
          </motion.h1>

          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: [null, 20, 0], opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
          >
            Embark on Infinite Journeys with Us:{" "}
            <b>Your Gateway to the Stars!</b>
            <br />
            We're the pioneers in spacecraft technology, bringing the wonders of
            space closer to you.
            <br />
            With showrooms spanning galaxies, we make space travel accessible to
            all.
            <br />
            Join us in unraveling the mysteries of the cosmos today!
          </motion.p>
        </Wrapper>
      )}
    </>
  );
};

export default Home;

const Wrapper = styled.section`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #042247;

  header {
    width: 90%;
    margin: 0 auto;
    padding: 4rem 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 13vh;
  }

  h1 {
    font-family: Nasastyle, Poppins, sans-serif;
    color: #fff;
    text-transform: uppercase;
    font-size: 6rem;
    width: 90%;
    margin: 6rem auto 0 auto;
    line-height: 1.1;
  }

  p {
    color: #fff;
    width: 90%;
    margin: 2rem auto;
  }

  img {
    width: 12rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 4rem;
    }

    p {
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    section {
      position: relative;
    }

    h1 {
      margin: 3rem auto 0 auto;
      font-size: 3rem;
    }

    p {
      font-size: 0.8rem;
    }

    button {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
    }

    img {
      width: 10rem;
    }

    .start-btn {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
  }
`;
