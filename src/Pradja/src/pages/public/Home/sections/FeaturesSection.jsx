import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiHome, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FiHome />,
      title: t('home.features.wideSelection', 'Wide Selection'),
      description: t('home.features.wideSelectionDesc', 'Browse thousands of properties'),
    },
    {
      icon: <FiDollarSign />,
      title: t('home.features.bestPrices', 'Best Prices'),
      description: t('home.features.bestPricesDesc', 'Competitive pricing guaranteed'),
    },
    {
      icon: <FiUsers />,
      title: t('home.features.expertAgents', 'Expert Agents'),
      description: t('home.features.expertAgentsDesc', 'Professional real estate agents'),
    },
    {
      icon: <FiTrendingUp />,
      title: t('home.features.investment', 'Investment'),
      description: t('home.features.investmentDesc', 'Smart property investments'),
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2>{t('home.features.title', 'Why Choose Us')}</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
