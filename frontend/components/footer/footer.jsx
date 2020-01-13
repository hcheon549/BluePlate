import React from "react";

const Footer = (props) => (
  <div className="footer-container">
    <ul className="footer-links">
      <li className="miniText" onClick={() => props.history.push('/faq')}>FAQs</li>
      <span />
      <li className="miniText"><a href="mailto:support@blueplattr.com">Contact us</a></li>
      <span />
      <li className="miniText" onClick={() => props.history.push('/terms-of-use')}>Terms of Use</li>
      <span />
      <li className="miniText" onClick={() => props.history.push('/privacy-policy')}>Privacy Policy</li>
      <span />
      <li className="miniText"><a href="mailto:hello@blueplattr.com">Become a vendor</a></li>
    </ul>
    <nav>
      <div style={{textAlign: "center"}}>All rights reserved<br/>&copy; BluePlans Inc.</div>
    </nav>
  </div>
);

export default Footer;
