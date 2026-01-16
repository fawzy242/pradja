import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

/**
 * Admin Login Page Component
 * Authentication page for admin panel access
 * 
 * @component
 */
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock authentication (replace with actual API call)
    setTimeout(() => {
      if (formData.email === 'admin@pradjaartha.com' && formData.password === 'admin123') {
        // Store token (mock)
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          name: 'Admin User',
          email: formData.email,
          role: 'admin',
        }));
        navigate('/admin/dashboard');
      } else {
        setError(t('admin.login.error') || 'Invalid email or password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">
        {t('admin.login.title') || 'Admin Login'}
      </h2>
      <p className="auth-form__subtitle">
        {t('admin.login.subtitle') || 'Enter your credentials to access the admin panel'}
      </p>

      {error && (
        <div className="alert alert--error mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="auth-form__field">
          <label htmlFor="email" className="auth-form__label">
            <FiMail /> {t('admin.login.email') || 'Email Address'}
          </label>
          <input
            type="email"
            id="email"
            className="auth-form__input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="admin@example.com"
            required
          />
        </div>

        <div className="auth-form__field">
          <label htmlFor="password" className="auth-form__label">
            <FiLock /> {t('admin.login.password') || 'Password'}
          </label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="auth-form__input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="password-input__toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="auth-form__remember">
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox__input"
              checked={formData.remember}
              onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
            />
            <span className="checkbox__label">
              {t('admin.login.remember') || 'Remember me'}
            </span>
          </label>
          <a href="/admin/forgot-password" className="auth-form__forgot-link">
            {t('admin.login.forgot') || 'Forgot password?'}
          </a>
        </div>

        <button
          type="submit"
          className={`button button--primary button--lg button--full-width auth-form__button ${
            loading ? 'button--loading' : ''
          }`}
          disabled={loading}
        >
          {loading ? t('admin.login.loading') || 'Signing in...' : t('admin.login.submit') || 'Sign In'}
        </button>
      </form>

      <div className="auth-form__divider">
        {t('admin.login.demo') || 'Demo Credentials'}
      </div>

      <div className="demo-credentials">
        <p><strong>Email:</strong> admin@pradjaartha.com</p>
        <p><strong>Password:</strong> admin123</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
