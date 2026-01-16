import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/atoms/Button';

const ServerError500 = () => {
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__code">500</h1>
        <h2 className="error-page__title">Server Error</h2>
        <p className="error-page__message">
          Something went wrong on our end. Please try again later.
        </p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServerError500;
