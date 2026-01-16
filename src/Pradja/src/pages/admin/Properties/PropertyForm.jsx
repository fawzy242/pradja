import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSave, FiX, FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import { Button, Input, Select, Textarea } from '../../../components/atoms';
import { Card, CardHeader, CardBody } from '../../../components/molecules';
import { propertyService } from '../../../services/mock';

/**
 * PropertyForm Component
 * Create/Edit property form
 */
const PropertyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'Apartment',
    status: 'For Sale',
    location: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    landArea: '',
    yearBuilt: '',
    features: [],
    images: [],
  });

  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState({});

  // Property types
  const propertyTypes = [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'House', label: 'House' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Land', label: 'Land' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  // Property status
  const propertyStatus = [
    { value: 'For Sale', label: 'For Sale' },
    { value: 'For Rent', label: 'For Rent' },
    { value: 'Sold', label: 'Sold' },
    { value: 'Rented', label: 'Rented' },
  ];

  // Load property data if editing
  useEffect(() => {
    if (isEditMode) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const response = await propertyService.getPropertyById(id);
      if (response.success) {
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Failed to load property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real app, upload to server and get URLs
    // For now, create fake URLs
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.area || formData.area <= 0) {
      newErrors.area = 'Valid area is required';
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
        await propertyService.updateProperty(id, formData);
      } else {
        await propertyService.createProperty(formData);
      }

      // Navigate back to properties list
      navigate('/admin/properties');
    } catch (error) {
      console.error('Failed to save property:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/properties');
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading property...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-form-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-header__title">
          {isEditMode ? 'Edit Property' : 'Create New Property'}
        </h1>
        <p className="page-header__subtitle">
          {isEditMode ? 'Update property information' : 'Add a new property to your listings'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        {/* Basic Information */}
        <Card className="property-form__section">
          <CardHeader>
            <h2>Basic Information</h2>
          </CardHeader>
          <CardBody>
            <div className="form-grid">
              <div className="form-grid__item form-grid__item--full">
                <label className="form-label" htmlFor="title">
                  Property Title <span className="form-label__required">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Modern Apartment in Central Jakarta"
                  error={errors.title}
                />
              </div>

              <div className="form-grid__item form-grid__item--full">
                <label className="form-label" htmlFor="description">
                  Description <span className="form-label__required">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the property in detail..."
                  error={errors.description}
                />
              </div>

              <div className="form-grid__item form-grid__item--half">
                <label className="form-label" htmlFor="type">
                  Property Type <span className="form-label__required">*</span>
                </label>
                <Select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="form-grid__item form-grid__item--half">
                <label className="form-label" htmlFor="status">
                  Status <span className="form-label__required">*</span>
                </label>
                <Select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {propertyStatus.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="form-grid__item form-grid__item--half">
                <label className="form-label" htmlFor="price">
                  Price (Rp) <span className="form-label__required">*</span>
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 2500000000"
                  error={errors.price}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Location Information */}
        <Card className="property-form__section">
          <CardHeader>
            <h2>Location</h2>
          </CardHeader>
          <CardBody>
            <div className="form-grid">
              <div className="form-grid__item form-grid__item--half">
                <label className="form-label" htmlFor="location">
                  City/Area <span className="form-label__required">*</span>
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Jakarta Pusat"
                  error={errors.location}
                />
              </div>

              <div className="form-grid__item form-grid__item--full">
                <label className="form-label" htmlFor="address">
                  Full Address
                </label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Property Details */}
        <Card className="property-form__section">
          <CardHeader>
            <h2>Property Details</h2>
          </CardHeader>
          <CardBody>
            <div className="form-grid">
              <div className="form-grid__item form-grid__item--quarter">
                <label className="form-label" htmlFor="bedrooms">
                  Bedrooms
                </label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid__item form-grid__item--quarter">
                <label className="form-label" htmlFor="bathrooms">
                  Bathrooms
                </label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid__item form-grid__item--quarter">
                <label className="form-label" htmlFor="area">
                  Building Area (m²) <span className="form-label__required">*</span>
                </label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  min="0"
                  value={formData.area}
                  onChange={handleChange}
                  error={errors.area}
                />
              </div>

              <div className="form-grid__item form-grid__item--quarter">
                <label className="form-label" htmlFor="landArea">
                  Land Area (m²)
                </label>
                <Input
                  id="landArea"
                  name="landArea"
                  type="number"
                  min="0"
                  value={formData.landArea}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid__item form-grid__item--half">
                <label className="form-label" htmlFor="yearBuilt">
                  Year Built
                </label>
                <Input
                  id="yearBuilt"
                  name="yearBuilt"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Features */}
        <Card className="property-form__section">
          <CardHeader>
            <h2>Features & Amenities</h2>
          </CardHeader>
          <CardBody>
            <div className="features-input">
              <div className="features-input__field">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  placeholder="e.g., Swimming Pool, Gym, Security 24/7"
                />
                <Button type="button" onClick={handleAddFeature} variant="secondary">
                  Add Feature
                </Button>
              </div>

              {formData.features.length > 0 && (
                <div className="features-list">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="feature-tag">
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="feature-tag__remove"
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

        {/* Images */}
        <Card className="property-form__section">
          <CardHeader>
            <h2>Property Images</h2>
          </CardHeader>
          <CardBody>
            <div className="image-upload">
              <div className="image-upload__dropzone">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload__input"
                />
                <label htmlFor="images" className="image-upload__label">
                  <FiUpload className="image-upload__icon" />
                  <span>Click to upload images or drag and drop</span>
                  <span className="image-upload__hint">PNG, JPG, JPEG up to 10MB each</span>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="image-preview-grid">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image.url || image} alt={`Property ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="image-preview__remove"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>

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
            <FiSave /> {saving ? 'Saving...' : (isEditMode ? 'Update Property' : 'Create Property')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
