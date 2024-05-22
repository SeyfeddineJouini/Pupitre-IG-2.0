import React from "react";
import './Footer.css';

export const Footer = ({ className, copyrightClassName, hasSocialLinks = true }) => {
  return (
    <div className={`footer-container ${className}`}>
      <div className="footer-content">
        <p className={`footer-text ${copyrightClassName}`}>
          © 2021 Themesberg, LLC. All rights reserved.
        </p>
        {hasSocialLinks && <img className="footer-social-links" alt="Social links" src="/img/social-links.svg" />}
      </div>
    </div>
  );
};
