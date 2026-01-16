import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Sidebar from '../../organisms/Sidebar';
import Topbar from '../../organisms/Topbar';

/**
 * Admin Layout Component
 * Layout wrapper for admin pages with sidebar and topbar
 */
const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Toggle sidebar collapse
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        onLogout={handleLogout}
      />
      <div className="admin-layout__main">
        <Topbar 
          onMenuToggle={handleSidebarToggle}
          user={user}
          onLogout={handleLogout}
        />
        <main className="admin-layout__content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
