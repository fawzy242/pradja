import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Input Component (Atom)
 * Reusable input field with various types and states
 */
const Input = forwardRef(({
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  size = 'medium',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  name,
  id,
  autoComplete,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = [
    'input',
    `input--${size}`,
    `input--${type}`,
    fullWidth && 'input--full-width',
    disabled && 'input--disabled',
    readOnly && 'input--readonly',
    error && 'input--error',
    isFocused && 'input--focused',
    icon && `input--with-icon-${iconPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="input-wrapper">
      <div className="input-container">
        {icon && iconPosition === 'left' && (
          <span className="input__icon input__icon--left">{icon}</span>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={inputClasses}
          name={name}
          id={id}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...rest}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input__icon input__icon--right">{icon}</span>
        )}
      </div>
      
      {errorMessage && (
        <span id={`${id}-error`} className="input__error">
          {errorMessage}
        </span>
      )}
      
      {helperText && !errorMessage && (
        <span id={`${id}-helper`} className="input__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
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
    'datetime-local',
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
};

export default Input;
