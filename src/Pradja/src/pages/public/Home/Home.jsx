import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { propertyService, agentService } from '../../../services/mock';
import SEO from '../../../components/common/SEO';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import PropertiesSection from './sections/PropertiesSection';
import AgentsSection from './sections/AgentsSection';
import TestimonialsSection from './sections/TestimonialsSection';

/**
 * Home Page Component
 * Landing page composed of multiple sections
 * 
 * @component
 * @example
 * <HomePage />
 */
const HomePage = () => {
  const { t } = useTranslation();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [featuredAgents, setFeaturedAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedData();
  }, []);

  const loadFeaturedData = async () => {
    try {
      setLoading(true);
      
      // Load featured properties
      const propertiesResponse = await propertyService.getFeaturedProperties(6);
      if (propertiesResponse.success) {
        setFeaturedProperties(propertiesResponse.data);
      }

      // Load featured agents
      const agentsResponse = await agentService.getFeaturedAgents(4);
      if (agentsResponse.success) {
        setFeaturedAgents(agentsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load featured data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={t('home.seo.title', 'Home')}
        description={t('home.seo.description', 'Find your dream property with PT Pradja Artha Sejahtera')}
        keywords={t('home.seo.keywords', 'real estate, property, house, apartment, villa, Indonesia')}
      />

      <div className="home-page">
        <HeroSection />
        <FeaturesSection />
        <PropertiesSection properties={featuredProperties} loading={loading} />
        <AgentsSection agents={featuredAgents} loading={loading} />
        <TestimonialsSection />
      </div>
    </>
  );
};

export default HomePage;
