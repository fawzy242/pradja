import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../../organisms/Navbar';
import Footer from '../../organisms/Footer';
import ScrollToTop from '../../common/ScrollToTop';

/**
 * PublicLayout Component
 * Main layout wrapper for public-facing pages
 * Includes Navbar, main content area, and Footer
 * 
 * @component
 * @example
 * <PublicLayout transparentNavbar={false}>
 *   <HomePage />
 * </PublicLayout>
 */
const PublicLayout = ({ 
  children,
  transparentNavbar = false,
  className = '',
}) => {
  return (
    <>
      <ScrollToTop />
      <div className={`public-layout ${className}`}>
        {/* Navigation */}
        <Navbar transparent={transparentNavbar} />

        {/* Main Content */}
        <main className="public-layout__main" role="main">
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

PublicLayout.propTypes = {
  /** Child components (alternative to Outlet) */
  children: PropTypes.node,
  /** Make navbar transparent initially */
  transparentNavbar: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default PublicLayout;
