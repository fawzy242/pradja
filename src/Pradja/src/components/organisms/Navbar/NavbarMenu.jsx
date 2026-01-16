import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * NavbarMenu Component
 * Desktop navigation menu
 */
const NavbarMenu = ({ items }) => {
  const location = useLocation();

  return (
    <nav className="navbar__menu">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`navbar__link ${
            location.pathname === item.path ? 'navbar__link--active' : ''
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

NavbarMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavbarMenu;
