import React from 'react';
import PropTypes from 'prop-types';
import SidebarMenuItem from './SidebarMenuItem';

/**
 * SidebarMenu Component
 * Menu list for sidebar
 */
const SidebarMenu = ({ items }) => {
  return (
    <nav className="sidebar__menu">
      {items.map((item, index) => (
        <SidebarMenuItem key={index} item={item} />
      ))}
    </nav>
  );
};

SidebarMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      subItems: PropTypes.array,
    })
  ).isRequired,
};

export default SidebarMenu;
