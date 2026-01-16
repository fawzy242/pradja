import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';
import Textarea from '../../atoms/Textarea';

/**
 * FormField Component (Molecule)
 * Wrapper for form inputs with label, helper text, and error handling
 */
const FormField = ({
  type = 'text',
  label,
  required = false,
  error = false,
  errorMessage,
  helperText,
  fullWidth = true,
  className = '',
  ...inputProps
}) => {
  const fieldClasses = [
    'form-field',
    fullWidth && 'form-field--full-width',
    error && 'form-field--error',
    required && 'form-field--required',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            {...inputProps}
            error={error}
            errorMessage={errorMessage}
            helperText={helperText}
            fullWidth={fullWidth}
            required={required}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            {...inputProps}
            error={error}
            errorMessage={errorMessage}
            helperText={helperText}
            fullWidth={fullWidth}
            required={required}
          />
        );
      
      default:
        return (
          <Input
            {...inputProps}
            type={type}
            error={error}
            errorMessage={errorMessage}
            helperText={helperText}
            fullWidth={fullWidth}
            required={required}
          />
        );
    }
  };

  return (
    <div className={fieldClasses}>
      {label && (
        <label className="form-field__label" htmlFor={inputProps.id}>
          {label}
          {required && <span className="form-field__required-indicator">*</span>}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

FormField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'select',
    'textarea',
  ]),
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default FormField;
