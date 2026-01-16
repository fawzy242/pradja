import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

/**
 * SidebarMenuItem Component
 * Individual menu item for sidebar
 */
const SidebarMenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleToggle = () => {
    if (hasSubItems) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="sidebar-menu-item">
      {item.path ? (
        <Link
          to={item.path}
          className={`sidebar-menu-item__link ${
            isActive ? 'sidebar-menu-item__link--active' : ''
          }`}
          onClick={handleToggle}
        >
          <span className="sidebar-menu-item__icon">{item.icon}</span>
          <span className="sidebar-menu-item__label">{item.label}</span>
          {hasSubItems && (
            <span className="sidebar-menu-item__arrow">
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          )}
        </Link>
      ) : (
        <button
          className="sidebar-menu-item__button"
          onClick={handleToggle}
        >
          <span className="sidebar-menu-item__icon">{item.icon}</span>
          <span className="sidebar-menu-item__label">{item.label}</span>
          {hasSubItems && (
            <span className="sidebar-menu-item__arrow">
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          )}
        </button>
      )}

      {hasSubItems && isOpen && (
        <div className="sidebar-menu-item__subitems">
          {item.subItems.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.path}
              className={`sidebar-menu-item__sublink ${
                location.pathname === subItem.path
                  ? 'sidebar-menu-item__sublink--active'
                  : ''
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

SidebarMenuItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    subItems: PropTypes.array,
  }).isRequired,
};

export default SidebarMenuItem;
