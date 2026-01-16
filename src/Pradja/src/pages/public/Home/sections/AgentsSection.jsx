import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMail, FiPhone, FiStar, FiArrowRight, FiUser } from 'react-icons/fi';
import { Button, Spinner } from '../../../../components/atoms';

const AgentsSection = ({ agents = [], loading = false }) => {
  const { t } = useTranslation();

  // Create placeholder for agent photo
  const AgentPhotoPlaceholder = ({ name, index }) => {
    const colors = ['#1a4d2e', '#2d7a4d', '#c8a882', '#d4b896'];
    const bgColor = colors[index % colors.length];
    
    return (
      <div 
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {name ? name.charAt(0).toUpperCase() : <FiUser size={48} />}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="agents-section section section--gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">
              {t('home.agents.title', 'Meet Our Expert Agents')}
            </h2>
          </div>
          <div className="loading-container">
            <Spinner size="large" />
            <p>Loading agents...</p>
          </div>
        </div>
      </section>
    );
  }

  if (agents.length === 0) {
    return null;
  }

  return (
    <section className="agents-section section section--gray">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-header__title">
              {t('home.agents.title', 'Meet Our Expert Agents')}
            </h2>
            <p className="section-header__subtitle">
              {t('home.agents.subtitle', 'Professional real estate agents ready to help you')}
            </p>
          </div>
          <Link to="/agents">
            <Button variant="outline" size="medium">
              {t('home.agents.viewAll', 'View All Agents')}
              <FiArrowRight />
            </Button>
          </Link>
        </div>

        <div className="agents-grid">
          {agents.slice(0, 4).map((agent, index) => (
            <div key={agent.id} className="agent-card">
              <div className="agent-card__photo">
                {agent.photo ? (
                  <img src={agent.photo} alt={agent.name} />
                ) : (
                  <AgentPhotoPlaceholder name={agent.name} index={index} />
                )}
              </div>

              <div className="agent-card__content">
                <h3 className="agent-card__name">{agent.name}</h3>
                <p className="agent-card__specialization">{agent.specialization}</p>

                {agent.rating && (
                  <div className="agent-card__rating">
                    <FiStar className="agent-card__star" />
                    <span>{agent.rating} / 5.0</span>
                  </div>
                )}

                <div className="agent-card__contact">
                  {agent.phone && (
                    <a href={`tel:${agent.phone}`} className="agent-card__contact-link">
                      <FiPhone />
                    </a>
                  )}
                  {agent.email && (
                    <a href={`mailto:${agent.email}`} className="agent-card__contact-link">
                      <FiMail />
                    </a>
                  )}
                </div>

                {agent.propertiesSold > 0 && (
                  <div className="agent-card__stats">
                    <span className="agent-card__stat">
                      {agent.propertiesSold} Properties Sold
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {agents.length > 4 && (
          <div className="agents-section__footer">
            <Link to="/agents">
              <Button variant="primary" size="large">
                {t('home.agents.viewAll', 'View All Agents')}
                <FiArrowRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentsSection;
