import React, { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import { Card, CardHeader, CardBody } from '../../../components/molecules/Card';
import Avatar from '../../../components/atoms/Avatar';
import { FiUser, FiMail, FiPhone, FiLock, FiCamera } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      console.log('Update profile:', formData);
      setSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      console.log('Change password');
      setSaving(false);
      alert('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  return (
    <div className="admin-profile-page">
      <div className="page-header">
        <div className="page-header__title-wrapper">
          <FiUser className="page-header__icon" />
          <h1 className="page-header__title">My Profile</h1>
        </div>
        <p className="page-header__description">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="admin-profile-page__content">
        <div className="admin-profile-grid">
          {/* Profile Picture Section */}
          <Card className="admin-profile-avatar-card">
            <CardBody>
              <div className="profile-avatar-section">
                <div className="profile-avatar-section__avatar">
                  <Avatar 
                    size="xlarge" 
                    name={user?.name} 
                    src={user?.avatar}
                  />
                  <button className="profile-avatar-section__upload-btn" aria-label="Change avatar">
                    <FiCamera />
                  </button>
                </div>
                <div className="profile-avatar-section__info">
                  <h3 className="profile-avatar-section__name">{user?.name || 'User'}</h3>
                  <p className="profile-avatar-section__role">{user?.role || 'Admin'}</p>
                  <p className="profile-avatar-section__email">{user?.email}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Profile Information Section */}
          <Card className="admin-profile-info-card">
            <CardHeader>
              <h2 className="card__title">Profile Information</h2>
              <p className="card__subtitle">Update your personal details</p>
            </CardHeader>
            
            <CardBody>
              <form className="profile-form" onSubmit={handleProfileUpdate}>
                <div className="form-field">
                  <label className="form-field__label">
                    <FiUser className="form-field__icon" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label">
                    <FiMail className="form-field__icon" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label">
                    <FiPhone className="form-field__icon" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 812 3456 7890"
                  />
                </div>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    variant="primary"
                    loading={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          {/* Change Password Section */}
          <Card className="admin-profile-password-card">
            <CardHeader>
              <h2 className="card__title">Change Password</h2>
              <p className="card__subtitle">Update your account password</p>
            </CardHeader>
            
            <CardBody>
              <form className="profile-form" onSubmit={handlePasswordChange}>
                <div className="form-field">
                  <label className="form-field__label">
                    <FiLock className="form-field__icon" />
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label">
                    <FiLock className="form-field__icon" />
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label">
                    <FiLock className="form-field__icon" />
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    variant="primary"
                    loading={saving}
                  >
                    {saving ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
