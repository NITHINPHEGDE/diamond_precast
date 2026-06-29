import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Diamond } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "products", label: "Products" },
  { to: "process", label: "Process" },
  { to: "gallery", label: "Gallery" },
  { to: "owners", label: "Owners" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`navbar-header ${scrolled ? "navbar-scrolled" : ""}`}
      role="banner"
    >
      <div className="navbar-inner">
        {/* Logo */}
        <Link
          to="home"
          smooth
          duration={600}
          className="navbar-logo"
          aria-label="Diamond Precast Home"
        >
          <img
            src="/images/logo.png"
            alt="Diamond Precast Logo"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-80}
              spy={true}
              activeClass="nav-link-active"
              onSetActive={() => setActiveSection(link.to)}
              className={`nav-link ${
                activeSection === link.to ? "nav-link-active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Call Button */}
        <a
          href="tel:+918884842088"
          className="navbar-cta"
          aria-label="Call Diamond Precast"
        >
          <Phone size={16} />
          <span>Call Now</span>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            role="navigation"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-80}
                  spy={true}
                  activeClass="nav-link-active"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className="mobile-menu-cta">
              <a
                href="tel:+918884842088"
                className="btn-primary"
                aria-label="Call Diamond Precast"
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}