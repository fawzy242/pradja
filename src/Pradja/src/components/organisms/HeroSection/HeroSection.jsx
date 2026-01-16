import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../atoms';
import { SearchBox } from '../../molecules';

/**
 * HeroSection Component (Organism)
 * Main hero/banner section for homepage
 */
const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  overlay = true,
  showSearch = false,
  onSearch,
  primaryAction,
  secondaryAction,
  className = '',
  ...rest
}) => {
  const heroClasses = [
    'hero-section',
    overlay && 'hero-section--with-overlay',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={heroClasses}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      {...rest}
    >
      <div className="hero-section__container container">
        <div className="hero-section__content">
          {title && (
            <h1 className="hero-section__title">{title}</h1>
          )}
          
          {subtitle && (
            <p className="hero-section__subtitle">{subtitle}</p>
          )}
          
          {showSearch && (
            <div className="hero-section__search">
              <SearchBox
                placeholder="Search properties by location, type, or price..."
                onSearch={onSearch}
                size="large"
                fullWidth
              />
            </div>
          )}
          
          {(primaryAction || secondaryAction) && (
            <div className="hero-section__actions">
              {primaryAction && (
                <Button
                  variant="primary"
                  size="large"
                  onClick={primaryAction.onClick}
                  className="hero-section__primary-button"
                >
                  {primaryAction.label}
                </Button>
              )}
              
              {secondaryAction && (
                <Button
                  variant="outline"
                  size="large"
                  onClick={secondaryAction.onClick}
                  className="hero-section__secondary-button"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  backgroundImage: PropTypes.string,
  overlay: PropTypes.bool,
  showSearch: PropTypes.bool,
  onSearch: PropTypes.func,
  primaryAction: PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  secondaryAction: PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
};

export default HeroSection;
