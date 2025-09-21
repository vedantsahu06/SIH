import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MagicBento from "../MagicBento";
import Orb from "../Orb";

function Login() {
  const location = useLocation();
  const [role, setRole] = useState("Student");
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  // Pre-select role based on state from Home page
  useEffect(() => {
    if (location.state?.selectedRole) {
      setRole(location.state.selectedRole);
    }
  }, [location.state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      {/* Orb overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      {/* Login card (always rendered at top of page) */}
      <div className="relative z-10 w-11/12 max-w-md mx-auto">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12} // Particle animation inside MagicBento
          glowColor="132, 0, 255"
          initialRole={role} // Pass role to MagicBento
        />
      </div>
    </div>
  );
}

export default Login;
