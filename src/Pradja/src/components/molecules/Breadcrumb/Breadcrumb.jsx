import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Breadcrumb Component (Molecule)
 * Navigation trail showing current page location
 */
const Breadcrumb = ({
  items = [],
  separator = '/',
  className = '',
}) => {
  const breadcrumbClasses = [
    'breadcrumb',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={breadcrumbClasses} aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.key || index} className="breadcrumb__item">
              {!isLast && item.href ? (
                <Link to={item.href} className="breadcrumb__link">
                  {item.icon && <span className="breadcrumb__icon">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
                  {item.icon && <span className="breadcrumb__icon">{item.icon}</span>}
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,
  separator: PropTypes.node,
  className: PropTypes.string,
};

export default Breadcrumb;
