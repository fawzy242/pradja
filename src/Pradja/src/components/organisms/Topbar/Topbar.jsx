import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiMenu,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';

/**
 * Topbar Component
 * Admin panel top navigation bar with user menu
 * 
 * @component
 * @example
 * <Topbar 
 *   onMenuToggle={() => {}} 
 *   user={{ name: 'Admin', email: 'admin@example.com' }}
 *   onLogout={() => {}}
 * />
 */
const Topbar = ({ 
  onMenuToggle, 
  user = {}, 
  onLogout,
  className = '' 
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Default user data - handle null user safely
  const userData = {
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@pradjaartha.com',
    avatar: user?.avatar || null,
    initials: user?.initials || (user?.name ? user.name.charAt(0).toUpperCase() : 'AU'),
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    setUserMenuOpen(false);
    navigate('/admin/profile');
  };

  // Handle settings navigation
  const handleSettingsClick = () => {
    setUserMenuOpen(false);
    navigate('/admin/settings');
  };

  // Handle logout
  const handleLogout = () => {
    setUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.topbar__user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  return (
    <header className={`topbar ${className}`} role="banner">
      <div className="topbar__container">
        {/* Left Section */}
        <div className="topbar__left">
          {/* Mobile Menu Toggle */}
          <button
            className="topbar__menu-toggle"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar menu"
            type="button"
          >
            <FiMenu />
          </button>

          {/* Page Title */}
          <h2 className="topbar__title">
            {t('admin.dashboard.title') || 'Dashboard'}
          </h2>
        </div>

        {/* Right Section */}
        <div className="topbar__right">
          {/* Notifications */}
          <button
            className="topbar__notification"
            aria-label="View notifications"
            type="button"
          >
            <FiBell />
            <span className="topbar__notification-badge" aria-label="3 unread notifications">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="topbar__user-menu">
            <button
              className="topbar__user-trigger"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
              type="button"
            >
              {/* Avatar */}
              <div className="topbar__avatar">
                {userData.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.name}
                    className="topbar__avatar-image"
                  />
                ) : (
                  <span className="topbar__avatar-initials">
                    {userData.initials}
                  </span>
                )}
              </div>

              {/* User Info */}
              <div className="topbar__user-info">
                <span className="topbar__user-name">{userData.name}</span>
                <span className="topbar__user-email">{userData.email}</span>
              </div>

              {/* Dropdown Arrow */}
              <FiChevronDown 
                className={`topbar__dropdown-arrow ${userMenuOpen ? 'topbar__dropdown-arrow--open' : ''}`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="topbar__dropdown" role="menu">
                <button
                  className="topbar__dropdown-item"
                  onClick={handleProfileClick}
                  role="menuitem"
                  type="button"
                >
                  <FiUser aria-hidden="true" />
                  <span>{t('admin.menu.profile') || 'Profile'}</span>
                </button>

                <button
                  className="topbar__dropdown-item"
                  onClick={handleSettingsClick}
                  role="menuitem"
                  type="button"
                >
                  <FiSettings aria-hidden="true" />
                  <span>{t('admin.menu.settings') || 'Settings'}</span>
                </button>

                <div className="topbar__dropdown-divider" role="separator" />

                <button
                  className="topbar__dropdown-item topbar__dropdown-item--danger"
                  onClick={handleLogout}
                  role="menuitem"
                  type="button"
                >
                  <FiLogOut aria-hidden="true" />
                  <span>{t('admin.logout') || 'Logout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Topbar.propTypes = {
  /** Toggle sidebar menu handler */
  onMenuToggle: PropTypes.func.isRequired,
  /** User data object */
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    initials: PropTypes.string,
  }),
  /** Logout handler */
  onLogout: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Topbar;
