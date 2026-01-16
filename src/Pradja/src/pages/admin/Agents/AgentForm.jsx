import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSave, FiX, FiUpload, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { Button, Input, Select, Textarea } from '../../../components/atoms';
import { Card, CardHeader, CardBody } from '../../../components/molecules';
import { agentService } from '../../../services/mock';

/**
 * AgentForm Component
 * Create/Edit agent form
 */
const AgentForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    bio: '',
    experience: '',
    languages: [],
    photo: null,
    active: true,
    featured: false,
  });

  const [newLanguage, setNewLanguage] = useState('');
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  // Specializations
  const specializations = [
    { value: 'Luxury Properties', label: 'Luxury Properties' },
    { value: 'Residential Properties', label: 'Residential Properties' },
    { value: 'Commercial Real Estate', label: 'Commercial Real Estate' },
    { value: 'Investment Properties', label: 'Investment Properties' },
    { value: 'Land Development', label: 'Land Development' },
  ];

  // Load agent data if editing
  useEffect(() => {
    if (isEditMode) {
      loadAgent();
    }
  }, [id]);

  const loadAgent = async () => {
    try {
      setLoading(true);
      const response = await agentService.getAgentById(id);
      if (response.success) {
        setFormData(response.data);
        if (response.data.photo) {
          setPhotoPreview(response.data.photo);
        }
      }
    } catch (error) {
      console.error('Failed to load agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      
      if (isEditMode) {
        await agentService.updateAgent(id, formData);
      } else {
        await agentService.createAgent(formData);
      }

      navigate('/admin/agents');
    } catch (error) {
      console.error('Failed to save agent:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/agents');
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-form-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-header__title">
          {isEditMode ? 'Edit Agent' : 'Create New Agent'}
        </h1>
        <p className="page-header__subtitle">
          {isEditMode ? 'Update agent information' : 'Add a new agent to your team'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="agent-form">
        <div className="agent-form__layout">
          {/* Left Column - Photo */}
          <div className="agent-form__sidebar">
            <Card>
              <CardHeader>
                <h2>Profile Photo</h2>
              </CardHeader>
              <CardBody>
                <div className="photo-upload">
                  <div className="photo-upload__preview">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Agent" className="photo-upload__image" />
                    ) : (
                      <div className="photo-upload__placeholder">
                        <FiUser size={48} />
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="photo-upload__input"
                  />
                  <label htmlFor="photo" className="photo-upload__button">
                    <FiUpload /> Upload Photo
                  </label>
                  <p className="photo-upload__hint">
                    Recommended: 400x400px, JPG or PNG
                  </p>
                </div>

                <div className="agent-status">
                  <label className="checkbox-field">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                    />
                    <span>Active Agent</span>
                  </label>

                  <label className="checkbox-field">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <span>Featured Agent</span>
                  </label>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Information */}
          <div className="agent-form__main">
            {/* Personal Information */}
            <Card className="agent-form__section">
              <CardHeader>
                <h2>Personal Information</h2>
              </CardHeader>
              <CardBody>
                <div className="form-grid">
                  <div className="form-grid__item form-grid__item--full">
                    <label className="form-label" htmlFor="name">
                      Full Name <span className="form-label__required">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., John Doe"
                      error={errors.name}
                    />
                  </div>

                  <div className="form-grid__item form-grid__item--half">
                    <label className="form-label" htmlFor="email">
                      Email Address <span className="form-label__required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FiMail className="input-icon" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        error={errors.email}
                      />
                    </div>
                  </div>

                  <div className="form-grid__item form-grid__item--half">
                    <label className="form-label" htmlFor="phone">
                      Phone Number <span className="form-label__required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FiPhone className="input-icon" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+62 812 3456 7890"
                        error={errors.phone}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Professional Information */}
            <Card className="agent-form__section">
              <CardHeader>
                <h2>Professional Information</h2>
              </CardHeader>
              <CardBody>
                <div className="form-grid">
                  <div className="form-grid__item form-grid__item--half">
                    <label className="form-label" htmlFor="specialization">
                      Specialization <span className="form-label__required">*</span>
                    </label>
                    <Select
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      error={errors.specialization}
                    >
                      <option value="">Select Specialization</option>
                      {specializations.map(spec => (
                        <option key={spec.value} value={spec.value}>
                          {spec.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="form-grid__item form-grid__item--half">
                    <label className="form-label" htmlFor="experience">
                      Years of Experience
                    </label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      max="50"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 5"
                    />
                  </div>

                  <div className="form-grid__item form-grid__item--full">
                    <label className="form-label" htmlFor="bio">
                      Bio / Description <span className="form-label__required">*</span>
                    </label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about the agent's background, expertise, and achievements..."
                      error={errors.bio}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Languages */}
            <Card className="agent-form__section">
              <CardHeader>
                <h2>Languages</h2>
              </CardHeader>
              <CardBody>
                <div className="languages-input">
                  <div className="languages-input__field">
                    <Input
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
                      placeholder="e.g., English, Indonesian, Mandarin"
                    />
                    <Button type="button" onClick={handleAddLanguage} variant="secondary">
                      Add Language
                    </Button>
                  </div>

                  {formData.languages.length > 0 && (
                    <div className="language-tags">
                      {formData.languages.map((language, index) => (
                        <div key={index} className="language-tag">
                          <span>{language}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(index)}
                            className="language-tag__remove"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={saving}
          >
            <FiX /> Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            disabled={saving}
          >
            <FiSave /> {saving ? 'Saving...' : (isEditMode ? 'Update Agent' : 'Create Agent')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;
