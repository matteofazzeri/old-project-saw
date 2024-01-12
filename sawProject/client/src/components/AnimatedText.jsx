import React from "react";
import { motion } from "framer-motion";

const AnimatedText = ({
  customStyles,
  text,
  containerAnimationProps,
  letterAnimationProps,
}) => {
  const letters = text.split("");

  return (
    <motion.div
      variants={containerAnimationProps}
      initial="initial"
      animate="animate"
      style={{ whiteSpace: 'pre-line' }}
      >
      {letters.map((letter, index) => (
        <motion.span
          className={customStyles}
          key={index}
          variants={letterAnimationProps}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
