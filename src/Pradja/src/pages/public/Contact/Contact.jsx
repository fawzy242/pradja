import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
} from 'react-icons/fi';

/**
 * Contact Page Component
 * Contact form with company information and map
 * 
 * @component
 */
const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: t('contact.address') || 'Address',
      content: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220, Indonesia',
    },
    {
      icon: <FiPhone />,
      title: t('contact.phone') || 'Phone',
      content: '+62 21 1234 5678',
      href: 'tel:+622112345678',
    },
    {
      icon: <FiMail />,
      title: t('contact.email') || 'Email',
      content: 'info@pradjaartha.com',
      href: 'mailto:info@pradjaartha.com',
    },
    {
      icon: <FiClock />,
      title: t('contact.hours') || 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-header__title">{t('contact.title') || 'Contact Us'}</h1>
          <p className="page-header__subtitle">
            {t('contact.subtitle') || 'Get in touch with our team'}
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="contact-layout">
          {/* Contact Info */}
          <aside className="contact-info">
            <h2 className="contact-info__title">{t('contact.getInTouch') || 'Get In Touch'}</h2>
            <p className="contact-info__description">
              {t('contact.description') || 
                'Have questions? We\'re here to help. Reach out to us through any of the following channels.'}
            </p>

            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item">
                  <div className="contact-info-item__icon">{info.icon}</div>
                  <div className="contact-info-item__content">
                    <h3 className="contact-info-item__title">{info.title}</h3>
                    {info.href ? (
                      <a href={info.href} className="contact-info-item__text contact-info-item__text--link">
                        {info.content}
                      </a>
                    ) : (
                      <p className="contact-info-item__text">
                        {info.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < info.content.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Contact Form */}
          <main className="contact-form-section">
            <div className="contact-form-card">
              <h2 className="contact-form-card__title">
                {t('contact.sendMessage') || 'Send us a Message'}
              </h2>

              {submitted && (
                <div className="alert alert--success">
                  <p>{t('contact.success') || 'Thank you! Your message has been sent successfully.'}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="form">
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="name" className="form__label">
                      {t('contact.form.name') || 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form__input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form__field">
                    <label htmlFor="email" className="form__label">
                      {t('contact.form.email') || 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form__input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="phone" className="form__label">
                      {t('contact.form.phone') || 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form__input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form__field">
                    <label htmlFor="subject" className="form__label">
                      {t('contact.form.subject') || 'Subject'} *
                    </label>
                    <select
                      id="subject"
                      className="form__select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="property">Property Information</option>
                      <option value="viewing">Schedule Viewing</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form__field">
                  <label htmlFor="message" className="form__label">
                    {t('contact.form.message') || 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    className="form__textarea"
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="button button--primary button--lg button--full-width">
                  <FiSend />
                  <span>{t('contact.form.submit') || 'Send Message'}</span>
                </button>
              </form>
            </div>
          </main>
        </div>

        {/* Map Section */}
        <section className="map-section mt-12">
          <div className="map-placeholder">
            <FiMapPin className="map-placeholder__icon" />
            <p className="map-placeholder__text">Map Integration Area</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
