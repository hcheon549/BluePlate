import React from "react";
import { Link, Redirect } from 'react-router-dom';

const Footer = () => (
  <div className="footer-container">
    <div className="footer-links">
      <Link to="/faq">FAQS</Link>
      <span />
      <a href="/">HELLO@BLUEPLATE.COM</a>
      <span />
      <a href="/">TERMS OF USE</a>
    </div>
    <nav>
      <div>&copy; BluePlate, INC.</div>
    </nav>
  </div>
);

export default Footer;
