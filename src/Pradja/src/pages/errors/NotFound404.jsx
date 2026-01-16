import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/atoms/Button';

const NotFound404 = () => {
  const { t } = useTranslation();
  
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__code">404</h1>
        <h2 className="error-page__title">Page Not Found</h2>
        <p className="error-page__message">
          The page you are looking for does not exist.
        </p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
