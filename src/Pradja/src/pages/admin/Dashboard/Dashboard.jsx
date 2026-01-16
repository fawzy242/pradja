import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';

/**
 * Admin Dashboard Page Component
 * Main dashboard with statistics and overview
 * 
 * @component
 */
const AdminDashboardPage = () => {
  const { t } = useTranslation();

  // Statistics
  const stats = [
    {
      icon: <FiHome />,
      label: t('admin.dashboard.totalProperties') || 'Total Properties',
      value: '156',
      change: '+12%',
      trend: 'up',
      color: 'primary',
    },
    {
      icon: <FiUsers />,
      label: t('admin.dashboard.totalAgents') || 'Total Agents',
      value: '24',
      change: '+3',
      trend: 'up',
      color: 'success',
    },
    {
      icon: <FiDollarSign />,
      label: t('admin.dashboard.totalSales') || 'Total Sales',
      value: 'Rp 45.2B',
      change: '+18%',
      trend: 'up',
      color: 'warning',
    },
    {
      icon: <FiTrendingUp />,
      label: t('admin.dashboard.inquiries') || 'Inquiries',
      value: '89',
      change: '-5%',
      trend: 'down',
      color: 'info',
    },
  ];

  // Recent properties
  const recentProperties = [
    {
      id: 1,
      title: 'Modern Apartment in Central Jakarta',
      location: 'Jakarta Pusat',
      price: 2500000000,
      status: 'Published',
      views: 245,
    },
    {
      id: 2,
      title: 'Luxury Villa with Ocean View',
      location: 'Bali',
      price: 5000000000,
      status: 'Published',
      views: 178,
    },
    {
      id: 3,
      title: 'Contemporary House in BSD',
      location: 'Tangerang',
      price: 3200000000,
      status: 'Draft',
      views: 92,
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(price);
  };

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-header__title">
            {t('admin.dashboard.welcome') || 'Welcome back, Admin!'}
          </h1>
          <p className="dashboard-header__subtitle">
            {t('admin.dashboard.subtitle') || "Here's what's happening with your properties today"}
          </p>
        </div>
        <Link to="/admin/properties/create" className="button button--primary">
          {t('admin.dashboard.addProperty') || 'Add Property'}
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card__content">
              <div className="stat-card__info">
                <div className="stat-card__label">{stat.label}</div>
                <div className="stat-card__value">{stat.value}</div>
                <div className={`stat-card__trend stat-card__trend--${stat.trend}`}>
                  {stat.trend === 'up' ? <FiArrowUp /> : <FiArrowDown />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`stat-card__icon stat-card__icon--${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Properties Table */}
      <div className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">
            {t('admin.dashboard.recentProperties') || 'Recent Properties'}
          </h2>
          <Link to="/admin/properties" className="dashboard-section__link">
            {t('admin.dashboard.viewAll') || 'View All'}
          </Link>
        </div>

        <div className="data-table">
          <div className="data-table__wrapper">
            <table className="data-table__table">
              <thead>
                <tr>
                  <th>{t('admin.dashboard.table.property') || 'Property'}</th>
                  <th>{t('admin.dashboard.table.location') || 'Location'}</th>
                  <th>{t('admin.dashboard.table.price') || 'Price'}</th>
                  <th>{t('admin.dashboard.table.status') || 'Status'}</th>
                  <th>{t('admin.dashboard.table.views') || 'Views'}</th>
                  <th>{t('admin.dashboard.table.actions') || 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {recentProperties.map((property) => (
                  <tr key={property.id}>
                    <td className="data-table__cell--primary">{property.title}</td>
                    <td>{property.location}</td>
                    <td>{formatPrice(property.price)}</td>
                    <td>
                      <span className={`badge badge--${property.status === 'Published' ? 'success' : 'warning'}`}>
                        {property.status}
                      </span>
                    </td>
                    <td>
                      <div className="data-table__views">
                        <FiEye />
                        <span>{property.views}</span>
                      </div>
                    </td>
                    <td>
                      <div className="data-table__actions">
                        <Link
                          to={`/admin/properties/edit/${property.id}`}
                          className="data-table__action"
                          aria-label="Edit"
                        >
                          <FiEdit />
                        </Link>
                        <button
                          className="data-table__action data-table__action--danger"
                          aria-label="Delete"
                          type="button"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="dashboard-section__title">
          {t('admin.dashboard.quickActions') || 'Quick Actions'}
        </h2>
        <div className="quick-actions-grid">
          <Link to="/admin/properties/create" className="quick-action-card">
            <div className="quick-action-card__icon">
              <FiHome />
            </div>
            <div className="quick-action-card__title">
              {t('admin.dashboard.addProperty') || 'Add Property'}
            </div>
          </Link>
          <Link to="/admin/agents/create" className="quick-action-card">
            <div className="quick-action-card__icon">
              <FiUsers />
            </div>
            <div className="quick-action-card__title">
              {t('admin.dashboard.addAgent') || 'Add Agent'}
            </div>
          </Link>
          <Link to="/admin/company-info" className="quick-action-card">
            <div className="quick-action-card__icon">
              <FiEdit />
            </div>
            <div className="quick-action-card__title">
              {t('admin.dashboard.editCompany') || 'Edit Company Info'}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
