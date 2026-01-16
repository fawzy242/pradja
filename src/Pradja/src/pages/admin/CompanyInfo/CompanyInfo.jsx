import React, { useState } from 'react';
import { FormField } from '../../../components/molecules';
import { Button } from '../../../components/atoms';
import { Card, CardHeader, CardBody } from '../../../components/molecules/Card';
import { FiSave, FiInfo } from 'react-icons/fi';

const CompanyInfo = () => {
  const [formData, setFormData] = useState({
    name: 'PT Pradja Artha Sejahtera',
    address: 'Jakarta, Indonesia',
    phone: '+62 21 1234 5678',
    email: 'info@pradja.com',
    website: 'https://pradjaartha.com',
    description: 'Leading real estate company in Indonesia',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate save
    setTimeout(() => {
      console.log('Save company info:', formData);
      setSaving(false);
      alert('Company information updated successfully!');
    }, 1000);
  };

  return (
    <div className="admin-company-info-page">
      <div className="page-header">
        <div className="page-header__title-wrapper">
          <FiInfo className="page-header__icon" />
          <h1 className="page-header__title">Company Information</h1>
        </div>
        <p className="page-header__description">
          Manage your company details and public information
        </p>
      </div>
      
      <div className="admin-company-info-page__content">
        <Card className="admin-company-info-card">
          <CardHeader>
            <h2 className="card__title">Basic Information</h2>
            <p className="card__subtitle">Update your company's basic details</p>
          </CardHeader>
          
          <CardBody>
            <form className="admin-company-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-grid__col form-grid__col--full">
                  <FormField
                    label="Company Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Enter company name"
                  />
                </div>

                <div className="form-grid__col form-grid__col--full">
                  <FormField
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required
                    placeholder="Enter company address"
                  />
                </div>

                <div className="form-grid__col form-grid__col--half">
                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    placeholder="+62 21 1234 5678"
                  />
                </div>

                <div className="form-grid__col form-grid__col--half">
                  <FormField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="info@company.com"
                  />
                </div>

                <div className="form-grid__col form-grid__col--full">
                  <FormField
                    label="Website URL"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://www.company.com"
                  />
                </div>

                <div className="form-grid__col form-grid__col--full">
                  <FormField
                    type="textarea"
                    label="Company Description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={5}
                    placeholder="Describe your company..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <Button 
                  type="submit" 
                  variant="primary"
                  loading={saving}
                  icon={<FiSave />}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CompanyInfo;
