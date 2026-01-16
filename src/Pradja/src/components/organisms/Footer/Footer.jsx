import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';

/**
 * Footer Component
 * Main footer with company info, links, and contact details
 * 
 * @component
 * @example
 * <Footer />
 */
const Footer = ({ className = '' }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Navigation links
  const quickLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.properties'), path: '/properties' },
    { label: t('nav.agents'), path: '/agents' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  // Company info links
  const companyLinks = [
    { label: t('footer.aboutUs'), path: '/about' },
    { label: t('footer.careers'), path: '/careers' },
    { label: t('footer.privacy'), path: '/privacy-policy' },
    { label: t('footer.terms'), path: '/terms-of-service' },
  ];

  // Social media links
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FiFacebook />,
      url: 'https://facebook.com/pradjaartha',
      ariaLabel: 'Visit our Facebook page',
    },
    {
      name: 'Instagram',
      icon: <FiInstagram />,
      url: 'https://instagram.com/pradjaartha',
      ariaLabel: 'Visit our Instagram profile',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin />,
      url: 'https://linkedin.com/company/pradjaartha',
      ariaLabel: 'Visit our LinkedIn page',
    },
    {
      name: 'Twitter',
      icon: <FiTwitter />,
      url: 'https://twitter.com/pradjaartha',
      ariaLabel: 'Visit our Twitter profile',
    },
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <FiMapPin />,
      label: t('footer.address'),
      value: 'Jakarta, Indonesia',
    },
    {
      icon: <FiPhone />,
      label: t('footer.phone'),
      value: '+62 21 xxxx xxxx',
      href: 'tel:+6221xxxxxxxx',
    },
    {
      icon: <FiMail />,
      label: t('footer.email'),
      value: 'info@pradjaartha.com',
      href: 'mailto:info@pradjaartha.com',
    },
  ];

  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="footer__main">
        <div className="container">
          <div className="footer__content">
            {/* Company Info Column */}
            <div className="footer__section footer__section--brand">
              <div className="footer__brand">
                <div className="footer__logo">
                  <span className="footer__logo-icon">PA</span>
                </div>
                <h3 className="footer__brand-name">
                  Pradja Artha Sejahtera
                </h3>
              </div>
              <p className="footer__description">
                {t('footer.description') || 
                  'Leading real estate company providing premium property solutions in Indonesia. Your trusted partner in finding the perfect home.'}
              </p>
              
              {/* Social Media */}
              <div className="footer__social">
                <p className="footer__social-title">{t('footer.followUs')}</p>
                <div className="footer__social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="footer__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="footer__section">
              <h4 className="footer__title">{t('footer.quickLinks')}</h4>
              <ul className="footer__links">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer__link-item">
                    <Link to={link.path} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer__section">
              <h4 className="footer__title">{t('footer.company')}</h4>
              <ul className="footer__links">
                {companyLinks.map((link) => (
                  <li key={link.path} className="footer__link-item">
                    <Link to={link.path} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer__section">
              <h4 className="footer__title">{t('footer.contact')}</h4>
              <ul className="footer__contacts">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="footer__contact-item">
                    <div className="footer__contact-icon" aria-hidden="true">
                      {contact.icon}
                    </div>
                    <div className="footer__contact-info">
                      <span className="footer__contact-label">{contact.label}</span>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="footer__contact-value footer__contact-value--link"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="footer__contact-value">{contact.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              &copy; {currentYear} Pradja Artha Sejahtera. {t('footer.allRightsReserved')}
            </p>
            <div className="footer__bottom-links">
              <Link to="/privacy-policy" className="footer__bottom-link">
                {t('footer.privacy')}
              </Link>
              <span className="footer__bottom-separator" aria-hidden="true">•</span>
              <Link to="/terms-of-service" className="footer__bottom-link">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Footer;
