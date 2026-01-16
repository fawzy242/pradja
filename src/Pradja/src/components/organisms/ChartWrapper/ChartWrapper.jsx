import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../molecules';
import { Spinner } from '../../atoms';

/**
 * ChartWrapper Component (Organism)
 * Wrapper for chart libraries with loading and error states
 */
const ChartWrapper = ({
  title,
  children,
  loading = false,
  error = false,
  errorMessage = 'Failed to load chart',
  height = '300px',
  actions,
  className = '',
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="chart-wrapper__loading" style={{ height }}>
          <Spinner size="large" />
          <p>Loading chart...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="chart-wrapper__error" style={{ height }}>
          <p>{errorMessage}</p>
        </div>
      );
    }
    
    return (
      <div className="chart-wrapper__content" style={{ height }}>
        {children}
      </div>
    );
  };

  return (
    <Card className={`chart-wrapper ${className}`}>
      {(title || actions) && (
        <div className="chart-wrapper__header">
          {title && <h3 className="chart-wrapper__title">{title}</h3>}
          {actions && <div className="chart-wrapper__actions">{actions}</div>}
        </div>
      )}
      {renderContent()}
    </Card>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  height: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
};

export default ChartWrapper;
