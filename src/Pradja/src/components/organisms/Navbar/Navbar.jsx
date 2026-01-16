import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiInfo,
  FiMail,
  FiMenu,
  FiX,
  FiGlobe,
} from 'react-icons/fi';

/**
 * Navbar Component
 * Main navigation bar with responsive mobile menu
 * 
 * @component
 * @example
 * <Navbar transparent={false} />
 */
const Navbar = ({ transparent = false, className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Navigation items
  const navItems = [
    { 
      icon: <FiHome />, 
      label: t('nav.home'), 
      path: '/' 
    },
    { 
      icon: <FiFileText />, 
      label: t('nav.properties'), 
      path: '/properties' 
    },
    { 
      icon: <FiUsers />, 
      label: t('nav.agents'), 
      path: '/agents' 
    },
    { 
      icon: <FiInfo />, 
      label: t('nav.about'), 
      path: '/about' 
    },
    { 
      icon: <FiMail />, 
      label: t('nav.contact'), 
      path: '/contact' 
    },
  ];

  // Handle scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [mobileMenuOpen]);

  // Toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Get navbar class names
  const getNavbarClasses = () => {
    const classes = ['navbar'];
    
    if (transparent && !scrolled) {
      classes.push('navbar--transparent');
    }
    
    if (scrolled) {
      classes.push('navbar--scrolled');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <>
      <nav className={getNavbarClasses()} role="navigation" aria-label="Main navigation">
        <div className="navbar__container">
          {/* Brand/Logo */}
          <Link to="/" className="navbar__brand" aria-label="Pradja Artha Sejahtera Home">
            <div className="navbar__logo">
              <span className="navbar__logo-icon">PA</span>
            </div>
            <span className="navbar__logo-text">
              Pradja Artha Sejahtera
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar__menu">
            {navItems.map((item) => (
              <li key={item.path} className="navbar__menu-item">
                <Link
                  to={item.path}
                  className={`navbar__link ${isActive(item.path) ? 'navbar__link--active' : ''}`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            {/* Language Switcher */}
            <button
              className="navbar__language"
              onClick={toggleLanguage}
              aria-label={`Switch to ${i18n.language === 'en' ? 'Indonesian' : 'English'}`}
              type="button"
            >
              <FiGlobe aria-hidden="true" />
              <span>{i18n.language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {mobileMenuOpen ? (
              <FiX aria-hidden="true" />
            ) : (
              <FiMenu aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`navbar__mobile-menu ${mobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <ul className="navbar__mobile-menu-list">
            {navItems.map((item) => (
              <li key={item.path} className="navbar__mobile-menu-item">
                <Link
                  to={item.path}
                  className={`navbar__mobile-link ${isActive(item.path) ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Actions */}
          <div className="navbar__mobile-actions">
            <button
              className="navbar__mobile-language"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              type="button"
            >
              <div className="navbar__mobile-language-content">
                <FiGlobe aria-hidden="true" />
                <span>Language: {i18n.language.toUpperCase()}</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="navbar-backdrop navbar-backdrop--visible"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

Navbar.propTypes = {
  /** Make navbar transparent (until scrolled) */
  transparent: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Navbar;
