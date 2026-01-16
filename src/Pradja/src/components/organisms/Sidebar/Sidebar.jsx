import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

/**
 * Sidebar Component
 * Admin panel sidebar navigation with collapsible menu
 * 
 * @component
 * @example
 * <Sidebar 
 *   collapsed={false} 
 *   onToggle={() => {}} 
 *   onLogout={() => {}}
 * />
 */
const Sidebar = ({ 
  collapsed = false, 
  onToggle, 
  onLogout,
  className = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Menu items configuration
  const menuItems = [
    {
      icon: <FiHome />,
      label: t('admin.menu.dashboard'),
      path: '/admin/dashboard',
    },
    {
      icon: <FiFileText />,
      label: t('admin.menu.properties'),
      path: '/admin/properties',
    },
    {
      icon: <FiUsers />,
      label: t('admin.menu.agents'),
      path: '/admin/agents',
    },
    {
      icon: <FiSettings />,
      label: t('admin.menu.companyInfo'),
      path: '/admin/company-info',
    },
    {
      icon: <FiUser />,
      label: t('admin.menu.profile'),
      path: '/admin/profile',
    },
  ];

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside 
      className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${className}`}
      aria-label="Admin sidebar navigation"
    >
      {/* Sidebar Header */}
      <div className="sidebar__header">
        <div className="sidebar__brand">
          {!collapsed && (
            <>
              <div className="sidebar__logo">
                <span className="sidebar__logo-icon">PA</span>
              </div>
              <h1 className="sidebar__title">
                {t('admin.title') || 'Admin Panel'}
              </h1>
            </>
          )}
          {collapsed && (
            <div className="sidebar__logo sidebar__logo--centered">
              <span className="sidebar__logo-icon">AP</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          type="button"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="sidebar__nav" role="navigation">
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar__menu-item">
              <button
                className={`sidebar__link ${isActive(item.path) ? 'sidebar__link--active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                aria-current={isActive(item.path) ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
                type="button"
              >
                <span className="sidebar__link-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="sidebar__link-text">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer (Logout) */}
      <div className="sidebar__footer">
        <button
          className="sidebar__logout"
          onClick={handleLogout}
          title={collapsed ? t('admin.logout') : undefined}
          type="button"
        >
          <span className="sidebar__logout-icon" aria-hidden="true">
            <FiLogOut />
          </span>
          {!collapsed && (
            <span className="sidebar__logout-text">
              {t('admin.logout') || 'Logout'}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  /** Whether sidebar is collapsed */
  collapsed: PropTypes.bool,
  /** Toggle collapse handler */
  onToggle: PropTypes.func.isRequired,
  /** Logout handler */
  onLogout: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Sidebar;
