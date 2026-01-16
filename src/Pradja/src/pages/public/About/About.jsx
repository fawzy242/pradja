import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiTarget, FiEye, FiHeart, FiAward, FiUsers, FiTrendingUp, FiHome } from 'react-icons/fi';
import { Button } from '../../../components/atoms';
import { Card } from '../../../components/molecules';

/**
 * About Page
 * Company information and team overview
 */
const About = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO & Founder',
      initial: 'JD',
      description: '15+ years in real estate',
      color: '#1a4d2e',
    },
    {
      name: 'Jane Smith',
      position: 'Head of Sales',
      initial: 'JS',
      description: 'Expert in residential properties',
      color: '#c8a882',
    },
    {
      name: 'Mike Johnson',
      position: 'Senior Agent',
      initial: 'MJ',
      description: 'Commercial real estate specialist',
      color: '#2d7a4d',
    },
  ];

  const values = [
    {
      icon: <FiTarget />,
      title: 'Our Mission',
      description: 'To provide exceptional real estate services with integrity and professionalism.',
    },
    {
      icon: <FiEye />,
      title: 'Our Vision',
      description: 'To be the most trusted real estate company in Indonesia.',
    },
    {
      icon: <FiHeart />,
      title: 'Our Values',
      description: 'Integrity, Excellence, Innovation, and Customer Focus.',
    },
  ];

  const stats = [
    { icon: <FiAward />, value: '20+', label: 'Years Experience' },
    { icon: <FiHome />, value: '5000+', label: 'Properties Sold' },
    { icon: <FiUsers />, value: '10000+', label: 'Happy Clients' },
    { icon: <FiTrendingUp />, value: '50+', label: 'Expert Agents' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-page__hero">
        <div className="container">
          <h1 className="about-page__title">About PT Pradja Artha Sejahtera</h1>
          <p className="about-page__subtitle">
            Your Trusted Partner in Real Estate Since 2000
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="about-page__overview section">
        <div className="container">
          <div className="about-page__overview-content">
            <div className="about-page__overview-text">
              <h2>Who We Are</h2>
              <p>
                PT Pradja Artha Sejahtera is a leading real estate company in Indonesia, 
                specializing in residential, commercial, and industrial properties. With over 
                20 years of experience, we have helped thousands of clients find their dream 
                properties.
              </p>
              <p>
                Our team of experienced professionals is dedicated to providing personalized 
                service and expert guidance throughout your real estate journey.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="large">Contact Us</Button>
              </Link>
            </div>
            <div className="about-page__overview-image">
              <div className="about-page__image-placeholder">
                <FiHome size={80} />
                <p>PT Pradja Artha Sejahtera</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-page__values section section--gray">
        <div className="container">
          <h2 className="section__title">Our Core Values</h2>
          <div className="about-page__values-grid">
            {values.map((value, index) => (
              <Card key={index} className="about-page__value-card">
                <div className="about-page__value-icon">{value.icon}</div>
                <h3 className="about-page__value-title">{value.title}</h3>
                <p className="about-page__value-description">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-page__team section">
        <div className="container">
          <h2 className="section__title">Meet Our Team</h2>
          <p className="section__subtitle">
            Dedicated professionals committed to your success
          </p>
          <div className="about-page__team-grid">
            {teamMembers.map((member, index) => (
              <Card key={index} className="about-page__team-card">
                <div 
                  className="about-page__team-photo"
                  style={{
                    background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}dd 100%)`
                  }}
                >
                  <span>{member.initial}</span>
                </div>
                <h3 className="about-page__team-name">{member.name}</h3>
                <p className="about-page__team-position">{member.position}</p>
                <p className="about-page__team-description">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-page__stats section section--primary">
        <div className="container">
          <div className="about-page__stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about-page__stat">
                <div className="about-page__stat-icon">{stat.icon}</div>
                <h3 className="about-page__stat-value">{stat.value}</h3>
                <p className="about-page__stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
