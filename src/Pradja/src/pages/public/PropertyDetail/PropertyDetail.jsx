import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiMapPin,
  FiHome,
  FiDroplet,
  FiMaximize,
  FiCar,
  FiCalendar,
  FiShare2,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiUser,
} from 'react-icons/fi';

/**
 * PropertyDetail Page Component
 * Detailed property view with gallery, features, and contact form
 * 
 * @component
 * @example
 * <PropertyDetailPage />
 */
const PropertyDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Mock property data (will be replaced with API call)
  const property = {
    id: id,
    title: 'Modern Apartment in Central Jakarta',
    location: 'Sudirman, Jakarta Pusat',
    price: 2500000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    carSpace: 2,
    type: 'Apartment',
    status: 'For Sale',
    yearBuilt: 2022,
    description: `Welcome to this stunning modern apartment located in the heart of Jakarta's business district. 
    
This beautifully designed 3-bedroom unit offers luxurious living with panoramic city views. The apartment features contemporary finishes, high ceilings, and floor-to-ceiling windows that flood the space with natural light.

The open-plan living and dining area is perfect for entertaining, with a designer kitchen equipped with premium appliances. Each bedroom is generously sized with built-in wardrobes, and the master suite includes an ensuite bathroom with luxury fixtures.

Residents enjoy access to world-class facilities including a swimming pool, fitness center, 24-hour security, and concierge services. Located within walking distance to shopping malls, restaurants, and public transportation.`,
    features: [
      'Air Conditioning',
      'Balcony',
      'Built-in Wardrobes',
      'City Views',
      'Dishwasher',
      'Gym Access',
      'High-Speed Internet',
      'Laundry Room',
      'Modern Kitchen',
      'Pool Access',
      'Security System',
      'Storage Room',
    ],
    images: [
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Image+1',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Image+2',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Image+3',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Image+4',
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '+62 812 3456 7890',
      email: 'sarah.johnson@pradjaartha.com',
      avatar: 'https://via.placeholder.com/100/1a4d2e/ffffff?text=SJ',
    },
  };

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // TODO: Implement actual form submission
    alert('Thank you! We will contact you soon.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="property-detail-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/properties" className="breadcrumb__link">Properties</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{property.title}</span>
          </nav>
        </div>
      </section>

      <div className="container py-8">
        {/* Image Gallery */}
        <section className="property-gallery">
          <div className="property-gallery__main">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="property-gallery__image"
            />
            <button
              className="property-gallery__nav property-gallery__nav--prev"
              onClick={prevImage}
              aria-label="Previous image"
              type="button"
            >
              <FiChevronLeft />
            </button>
            <button
              className="property-gallery__nav property-gallery__nav--next"
              onClick={nextImage}
              aria-label="Next image"
              type="button"
            >
              <FiChevronRight />
            </button>
            <div className="property-gallery__counter">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
          <div className="property-gallery__thumbnails">
            {property.images.map((image, index) => (
              <button
                key={index}
                className={`property-gallery__thumbnail ${
                  index === currentImageIndex ? 'property-gallery__thumbnail--active' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
                type="button"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </section>

        <div className="property-detail-layout">
          {/* Main Content */}
          <main className="property-detail-main">
            {/* Header */}
            <div className="property-header">
              <div className="property-header__top">
                <div className="property-badges">
                  <span className="badge badge--primary">{property.status}</span>
                  <span className="badge badge--secondary">{property.type}</span>
                </div>
                <div className="property-actions">
                  <button className="property-action" aria-label="Share property" type="button">
                    <FiShare2 />
                  </button>
                  <button className="property-action" aria-label="Save to favorites" type="button">
                    <FiHeart />
                  </button>
                </div>
              </div>
              <h1 className="property-header__title">{property.title}</h1>
              <div className="property-header__location">
                <FiMapPin />
                <span>{property.location}</span>
              </div>
              <div className="property-header__price">{formatPrice(property.price)}</div>
            </div>

            {/* Key Features */}
            <div className="property-features-grid">
              <div className="property-feature-item">
                <FiHome className="property-feature-item__icon" />
                <div className="property-feature-item__content">
                  <div className="property-feature-item__value">{property.bedrooms}</div>
                  <div className="property-feature-item__label">Bedrooms</div>
                </div>
              </div>
              <div className="property-feature-item">
                <FiDroplet className="property-feature-item__icon" />
                <div className="property-feature-item__content">
                  <div className="property-feature-item__value">{property.bathrooms}</div>
                  <div className="property-feature-item__label">Bathrooms</div>
                </div>
              </div>
              <div className="property-feature-item">
                <FiMaximize className="property-feature-item__icon" />
                <div className="property-feature-item__content">
                  <div className="property-feature-item__value">{property.area} m²</div>
                  <div className="property-feature-item__label">Floor Area</div>
                </div>
              </div>
              <div className="property-feature-item">
                <FiCar className="property-feature-item__icon" />
                <div className="property-feature-item__content">
                  <div className="property-feature-item__value">{property.carSpace}</div>
                  <div className="property-feature-item__label">Car Spaces</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="property-section">
              <h2 className="property-section__title">Description</h2>
              <div className="property-description">
                {property.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Features & Amenities */}
            <section className="property-section">
              <h2 className="property-section__title">Features & Amenities</h2>
              <div className="property-features-list">
                {property.features.map((feature, index) => (
                  <div key={index} className="property-features-list__item">
                    <span className="property-features-list__icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Property Info */}
            <section className="property-section">
              <h2 className="property-section__title">Property Information</h2>
              <div className="property-info-grid">
                <div className="property-info-item">
                  <div className="property-info-item__label">Property Type</div>
                  <div className="property-info-item__value">{property.type}</div>
                </div>
                <div className="property-info-item">
                  <div className="property-info-item__label">Status</div>
                  <div className="property-info-item__value">{property.status}</div>
                </div>
                <div className="property-info-item">
                  <div className="property-info-item__label">Year Built</div>
                  <div className="property-info-item__value">{property.yearBuilt}</div>
                </div>
                <div className="property-info-item">
                  <div className="property-info-item__label">Property ID</div>
                  <div className="property-info-item__value">PAS-{property.id}</div>
                </div>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="property-detail-sidebar">
            {/* Agent Contact Card */}
            <div className="agent-contact-card">
              <h3 className="agent-contact-card__title">Contact Agent</h3>
              <div className="agent-contact-card__agent">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="agent-contact-card__avatar"
                />
                <div className="agent-contact-card__info">
                  <div className="agent-contact-card__name">{property.agent.name}</div>
                  <div className="agent-contact-card__role">Property Agent</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__field">
                  <label htmlFor="name" className="contact-form__label">
                    <FiUser /> Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="contact-form__input"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="email" className="contact-form__label">
                    <FiMail /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="contact-form__input"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="phone" className="contact-form__label">
                    <FiPhone /> Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="contact-form__input"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="message" className="contact-form__label">Message</label>
                  <textarea
                    id="message"
                    className="contact-form__textarea"
                    rows="4"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="I'm interested in this property..."
                    required
                  />
                </div>

                <button type="submit" className="button button--primary button--full-width">
                  Send Message
                </button>
              </form>

              <div className="agent-contact-card__direct">
                <a href={`tel:${property.agent.phone}`} className="button button--outline button--full-width">
                  <FiPhone /> Call Agent
                </a>
                <a href={`mailto:${property.agent.email}`} className="button button--outline button--full-width">
                  <FiMail /> Email Agent
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
