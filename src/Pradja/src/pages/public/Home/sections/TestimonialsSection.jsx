import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiStar } from 'react-icons/fi';

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Property Buyer',
      content: 'Excellent service! Found my dream home in just 2 weeks.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Property Seller',
      content: 'Professional team that helped sell my property quickly.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      role: 'Investor',
      content: 'Great investment opportunities and expert advice.',
      rating: 5,
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>{t('home.testimonials.title', 'What Our Clients Say')}</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
