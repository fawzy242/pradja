import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiHome, FiMaximize, FiArrowRight } from 'react-icons/fi';
import { Button, Spinner, PropertyImagePlaceholder } from '../../../../components/atoms';

const PropertiesSection = ({ properties = [], loading = false }) => {
  const { t } = useTranslation();

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `Rp ${price.toLocaleString('id-ID')}`;
    }
    return price;
  };

  if (loading) {
    return (
      <section className="properties-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">
              {t('home.properties.title', 'Featured Properties')}
            </h2>
          </div>
          <div className="loading-container">
            <Spinner size="large" />
            <p>Loading properties...</p>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="properties-section section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-header__title">
              {t('home.properties.title', 'Featured Properties')}
            </h2>
            <p className="section-header__subtitle">
              {t('home.properties.subtitle', 'Handpicked premium properties for you')}
            </p>
          </div>
          <Link to="/properties">
            <Button variant="outline" size="medium">
              {t('home.properties.viewAll', 'View All Properties')}
              <FiArrowRight />
            </Button>
          </Link>
        </div>

        <div className="properties-grid">
          {properties.slice(0, 6).map((property, index) => (
            <Link 
              key={property.id} 
              to={`/properties/${property.id}`}
              className="property-card"
            >
              <div className="property-card__image">
                {property.image ? (
                  <img src={property.image} alt={property.title} />
                ) : (
                  <PropertyImagePlaceholder index={index} />
                )}
                <div className="property-card__badge">
                  {property.status || 'For Sale'}
                </div>
              </div>

              <div className="property-card__content">
                <h3 className="property-card__title">{property.title}</h3>
                
                <div className="property-card__location">
                  <FiMapPin />
                  <span>{property.location}</span>
                </div>

                <div className="property-card__details">
                  <div className="property-card__detail">
                    <FiHome />
                    <span>{property.bedrooms || 0} Beds</span>
                  </div>
                  <div className="property-card__detail">
                    <FiHome />
                    <span>{property.bathrooms || 0} Baths</span>
                  </div>
                  <div className="property-card__detail">
                    <FiMaximize />
                    <span>{property.area || 0} m²</span>
                  </div>
                </div>

                <div className="property-card__footer">
                  <div className="property-card__price">
                    {formatPrice(property.price)}
                  </div>
                  <div className="property-card__type">
                    {property.type || 'Property'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {properties.length > 6 && (
          <div className="properties-section__footer">
            <Link to="/properties">
              <Button variant="primary" size="large">
                {t('home.properties.viewAll', 'View All Properties')}
                <FiArrowRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
