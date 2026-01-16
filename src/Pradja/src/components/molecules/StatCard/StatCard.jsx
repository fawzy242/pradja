import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

/**
 * StatCard Component (Molecule)
 * Statistical card for displaying key metrics
 */
const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  trend,
  footer,
  variant = 'default',
  loading = false,
  className = '',
  ...rest
}) => {
  const statCardClasses = [
    'stat-card',
    `stat-card--${variant}`,
    loading && 'stat-card--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderChange = () => {
    if (!change) return null;

    const changeClasses = [
      'stat-card__change',
      `stat-card__change--${changeType}`,
    ]
      .filter(Boolean)
      .join(' ');

    const getChangeIcon = () => {
      if (changeType === 'positive') return '↑';
      if (changeType === 'negative') return '↓';
      return '−';
    };

    return (
      <div className={changeClasses}>
        <span className="stat-card__change-icon">{getChangeIcon()}</span>
        <span className="stat-card__change-value">{change}</span>
      </div>
    );
  };

  const cardContent = (
    <div className={statCardClasses}>
      {icon && (
        <div className="stat-card__icon">
          {icon}
        </div>
      )}
      
      <div className="stat-card__content">
        {title && (
          <div className="stat-card__title">{title}</div>
        )}
        
        <div className="stat-card__value-wrapper">
          {loading ? (
            <div className="stat-card__skeleton"></div>
          ) : (
            <>
              <div className="stat-card__value">{value}</div>
              {renderChange()}
            </>
          )}
        </div>
        
        {trend && (
          <div className="stat-card__trend">
            {trend}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card
      variant={variant}
      footer={footer}
      className="stat-card-wrapper"
      {...rest}
    >
      {cardContent}
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.node,
  value: PropTypes.node.isRequired,
  change: PropTypes.node,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  icon: PropTypes.node,
  trend: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'filled']),
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default StatCard;
