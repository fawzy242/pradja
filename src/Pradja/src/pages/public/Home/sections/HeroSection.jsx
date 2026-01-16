import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/atoms/Button';

/**
 * HeroSection Component
 * Hero banner section for home page with enhanced styling
 */
const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      {/* Decorative background elements */}
      <div className="hero-section__decoration hero-section__decoration--circle-1"></div>
      <div className="hero-section__decoration hero-section__decoration--circle-2"></div>
      
      <div className="hero-section__container">
        <div className="hero-section__content">
          <p className="hero-section__subtitle">
            {t('app.tagline', 'Mitra Properti Terpercaya Anda')}
          </p>
          
          <h1 className="hero-section__title">
            {t('home.hero.title', 'Temukan Properti Impian Anda')}
          </h1>
          
          <p className="hero-section__description">
            {t('home.hero.subtitle', 'Temukan properti terbaik di Indonesia dengan layanan profesional terpercaya')}
          </p>
          
          <div className="hero-section__actions">
            <Link to="/properties">
              <Button variant="primary" size="large">
                {t('home.hero.searchButton', 'Browse Properties')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="large">
                {t('home.hero.contactUs', 'Contact Us')}
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="hero-section__stats">
            <div className="hero-section__stat">
              <span className="hero-section__stat-value">156</span>
              <span className="hero-section__stat-label">
                {t('home.stats.properties', 'Properti')}
              </span>
            </div>
            <div className="hero-section__stat">
              <span className="hero-section__stat-value">24</span>
              <span className="hero-section__stat-label">
                {t('home.stats.agents', 'Agen Ahli')}
              </span>
            </div>
            <div className="hero-section__stat">
              <span className="hero-section__stat-value">10K+</span>
              <span className="hero-section__stat-label">
                {t('home.stats.clients', 'Klien Puas')}
              </span>
            </div>
            <div className="hero-section__stat">
              <span className="hero-section__stat-value">20+</span>
              <span className="hero-section__stat-label">
                {t('home.stats.experience', 'Tahun Pengalaman')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
