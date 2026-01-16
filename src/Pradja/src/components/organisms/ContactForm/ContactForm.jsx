import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormField } from '../../molecules';
import { Button } from '../../atoms';

/**
 * ContactForm Component (Organism)
 * Contact/inquiry form for properties or agents
 */
const ContactForm = ({
  onSubmit,
  property,
  agent,
  loading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit?.({
        ...formData,
        propertyId: property?.id,
        agentId: agent?.id,
      });
    }
  };

  return (
    <form className={`contact-form ${className}`} onSubmit={handleSubmit}>
      <h3 className="contact-form__title">Send Inquiry</h3>
      
      {property && (
        <p className="contact-form__context">
          Regarding: <strong>{property.title}</strong>
        </p>
      )}
      
      {agent && (
        <p className="contact-form__context">
          Contact: <strong>{agent.name}</strong>
        </p>
      )}
      
      <FormField
        type="text"
        label="Your Name"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={!!errors.name}
        errorMessage={errors.name}
        required
      />
      
      <FormField
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={!!errors.email}
        errorMessage={errors.email}
        required
      />
      
      <FormField
        type="tel"
        label="Phone Number"
        placeholder="+62 812 3456 7890"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={!!errors.phone}
        errorMessage={errors.phone}
        required
      />
      
      <FormField
        type="textarea"
        label="Message"
        placeholder="I'm interested in this property..."
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={!!errors.message}
        errorMessage={errors.message}
        rows={5}
        required
      />
      
      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={loading}
      >
        Send Message
      </Button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  property: PropTypes.object,
  agent: PropTypes.object,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default ContactForm;
