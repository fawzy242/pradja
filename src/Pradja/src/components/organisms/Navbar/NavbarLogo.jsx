import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NavbarLogo Component
 * Logo section of the navbar
 */
const NavbarLogo = () => {
  return (
    <Link to="/" className="navbar__logo">
      <img src="/assets/images/logo.svg" alt="PT Pradja Artha Sejahtera" />
      <span className="navbar__logo-text">Pradja Artha</span>
    </Link>
  );
};

export default NavbarLogo;
