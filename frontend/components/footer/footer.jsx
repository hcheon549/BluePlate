import React from "react";

const Footer = (props) => (
  <div className="footer-container">
    <ul className="footer-links">
      <li className="miniText" onClick={() => props.history.push('/faq')}>FAQs</li>
      <span />
      <li className="miniText" onClick={() => props.history.push('/')}>Contact us</li>
      <span />
      <li className="miniText" onClick={() => props.history.push('/')}>Terms of Use</li>
      <span />
      <li className="miniText" onClick={() => props.history.push('/')}>Privacy Policy</li>
      <span />
      <li className="miniText" onClick={() => props.history.push('/')}>Career</li>
    </ul>
    <nav>
      <div>&copy; BluePlan, INC.</div>
    </nav>
  </div>
);

export default Footer;
