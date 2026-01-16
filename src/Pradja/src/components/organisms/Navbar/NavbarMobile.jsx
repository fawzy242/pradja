import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';

/**
 * NavbarMobile Component
 * Mobile navigation menu
 */
const NavbarMobile = ({ items, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="navbar__mobile">
      <div className="navbar__mobile-overlay" onClick={onClose} />
      <div className="navbar__mobile-menu">
        <button className="navbar__mobile-close" onClick={onClose}>
          <FiX />
        </button>
        <nav className="navbar__mobile-nav">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="navbar__mobile-link"
              onClick={onClose}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

NavbarMobile.propTypes = {
  items: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NavbarMobile;
