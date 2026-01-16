import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../../molecules';
import { Avatar, Button, Badge } from '../../atoms';

/**
 * AgentCard Component (Organism)
 * Display agent information in card format
 */
const AgentCard = ({
  agent,
  onContact,
  showDetails = true,
  className = '',
}) => {
  const {
    id,
    name,
    email,
    phone,
    photo,
    position,
    specialization,
    propertiesCount,
    rating,
    isFeatured,
  } = agent;

  return (
    <Card className={`agent-card ${className}`} hover>
      <div className="agent-card__header">
        <Avatar
          src={photo}
          name={name}
          size="xlarge"
        />
        
        {isFeatured && (
          <Badge variant="primary" className="agent-card__featured-badge">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="agent-card__content">
        <Link to={`/agents/${id}`}>
          <h3 className="agent-card__name">{name}</h3>
        </Link>
        
        {position && (
          <p className="agent-card__position">{position}</p>
        )}
        
        {specialization && (
          <p className="agent-card__specialization">{specialization}</p>
        )}
        
        {showDetails && (
          <>
            {rating && (
              <div className="agent-card__rating">
                ⭐ {rating} / 5.0
              </div>
            )}
            
            {propertiesCount && (
              <div className="agent-card__properties">
                🏠 {propertiesCount} Properties
              </div>
            )}
            
            <div className="agent-card__contact-info">
              {email && <div>📧 {email}</div>}
              {phone && <div>📞 {phone}</div>}
            </div>
          </>
        )}
      </div>
      
      <div className="agent-card__actions">
        <Button
          variant="primary"
          fullWidth
          onClick={() => onContact?.(agent)}
        >
          Contact Agent
        </Button>
      </div>
    </Card>
  );
};

AgentCard.propTypes = {
  agent: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    photo: PropTypes.string,
    position: PropTypes.string,
    specialization: PropTypes.string,
    propertiesCount: PropTypes.number,
    rating: PropTypes.number,
    isFeatured: PropTypes.bool,
  }).isRequired,
  onContact: PropTypes.func,
  showDetails: PropTypes.bool,
  className: PropTypes.string,
};

export default AgentCard;
