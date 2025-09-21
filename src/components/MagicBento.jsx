import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = "132, 0, 255";

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 10;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const BigCard = ({
  color = "#060010",
  title = "Login",
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const [role, setRole] = useState("Student");

  // Tilt effect
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.2,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    particlesRef.current = Array.from({ length: DEFAULT_PARTICLE_COUNT }, () => {
      const particle = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
      el.appendChild(particle);

      // Animate particle
      gsap.to(particle, {
        x: "+=" + (Math.random() * 100 - 50),
        y: "+=" + (Math.random() * 100 - 50),
        rotation: Math.random() * 360,
        duration: 2 + Math.random() * 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(particle, {
        opacity: 0.2 + Math.random() * 0.6,
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
      });

      return particle;
    });

    return () => {
      particlesRef.current.forEach((p) => p.remove());
    };
  }, [glowColor]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col justify-between min-h-[450px] w-full max-w-[480px] p-8 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
      style={{
        backgroundColor: color,
        borderColor: `rgba(${glowColor},0.3)`,
        color: "white",
      }}
    >
      {/* Role Selector */}
      <div className="flex justify-center gap-4 mb-6 z-20 relative">
        {["Student", "Faculty", "Company"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              role === r
                ? "bg-purple-600 text-white"
                : "bg-[#120020] text-gray-300 hover:bg-purple-700 hover:text-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 relative z-20">
        <input
          type="email"
          placeholder={`${role} Email`}
          className="p-3 rounded-lg bg-[#120020] border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-[#120020] border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
        />
        <button
          type="submit"
          className="mt-2 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-4 rounded-lg"
        >
          {title} as {role}
        </button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-sm text-center opacity-80 cursor-pointer hover:underline relative z-20">
        Don’t have an account? Sign up
      </p>

      {/* Particles container is automatically appended in useEffect */}
    </div>
  );
};

export default BigCard;
