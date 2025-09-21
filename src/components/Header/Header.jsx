import React, { useState, useEffect, useRef } from "react";
import { FloatingDockDemo } from "../FloatingDockDemo";

function Header() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Start or reset the hide timer
  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 3000); // hide after 3s
  };

  useEffect(() => {
    resetTimer();

    const handleMouseMove = (e) => {
      if (e.clientY < 50) {
        setVisible(true);
        resetTimer();
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setVisible(true);
        resetTimer();
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center z-50 transition-all duration-300 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <FloatingDockDemo />
    </div>
  );
}

export default Header;
