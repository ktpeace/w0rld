import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer-links">
        <Link to="/about" className="footer-link">
          <li>About</li>
        </Link>
        <Link to="/contact" className="footer-link">
          <li>Contact</li>
        </Link>
        <Link to="/disclaimer" className="footer-link">
          <li>Disclaimer</li>
        </Link>
        <Link to="/donate" className="footer-link">
          <li>Donate</li>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
