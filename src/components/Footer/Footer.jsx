import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll smoothly to an element by selector
  const scrollToElement = (selector) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // fallback to top if element not found
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll to main header (hero)
  const scrollToHeader = () => scrollToElement("section#home");

  // Scroll to Key Features section
  const scrollToKeyFeatures = () => scrollToElement("#keyfeatures");

  // Handle Home click:
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Delay scrolling until page renders:
      setTimeout(scrollToHeader, 100); 
    } else {
      scrollToHeader();
    }
  };

  // Handle Features click:
  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToKeyFeatures, 100);
    } else {
      scrollToKeyFeatures();
    }
  };

  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-bold mb-4">About Us</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong>Smart Education Platform</strong> is where{" "}
            <strong>Intellect</strong> meets <strong>Ambition</strong> and
            discovers <strong>Opportunity.</strong> We bridge learners,
            educators, and companies into one seamless experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={handleHomeClick}
                className="hover:text-white transition duration-200 cursor-pointer bg-transparent p-0"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={handleFeaturesClick}
                className="hover:text-white transition duration-200 cursor-pointer bg-transparent p-0"
              >
                Features
              </button>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white transition duration-200">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help-center" className="hover:text-white transition duration-200">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-white transition duration-200">
                Support
              </Link>
            </li>
            <li>
              <Link to="/documentation" className="hover:text-white transition duration-200">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-white transition duration-200">
                Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              Email:{" "}
              <strong>
                <a
                  href="mailto:support@smartedu.com"
                  className="hover:text-white transition duration-200"
                >
                  support@smartedu.com
                </a>
              </strong>
            </li>
            <li>Location: Nagpur, India</li>
          
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
