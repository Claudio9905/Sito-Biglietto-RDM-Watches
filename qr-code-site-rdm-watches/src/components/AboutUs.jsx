import React, { useRef, useEffect, useState } from "react";
import Banner_AboutUs from "../assets/banner_about_us.jpg";
import ScrollReveal from "scrollreveal";
import Carousel from "react-bootstrap/Carousel";
import { imgCarouselProfile } from "../data/utility";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const AboutUs = () => {
  const boxRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Avvio animazione in uscita
      setAnimateText(true);

      // Dopo che l'animazione è finita -> cambia slide
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % imgCarouselProfile.length);
        setAnimateText(false);
      }, 600);
    }, 7000);

    ScrollReveal().reveal(boxRef.current, {
      duration: 2000,
      distance: "50px",
      origin: "right",
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      reset: true,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="carousel_container">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={imgCarouselProfile[currentIndex].image}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{
              duration: 0.6,
              ease: "cubic-bezier(0.5, 0, 0, 1)",
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AnimatePresence>
        <div id="div_content" className="position-absolute">
          <p className={`carousel-text ${animateText ? "fade" : ""}`}>
            {imgCarouselProfile[currentIndex].p}
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
