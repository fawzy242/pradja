import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Select Component (Atom)
 * Reusable select dropdown with options
 */
const Select = forwardRef(({
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  size = 'medium',
  fullWidth = false,
  className = '',
  name,
  id,
  ...rest
}, ref) => {
  const selectClasses = [
    'select',
    `select--${size}`,
    fullWidth && 'select--full-width',
    disabled && 'select--disabled',
    error && 'select--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="select-wrapper">
      <div className="select-container">
        <select
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={selectClasses}
          name={name}
          id={id}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option
              key={option.value || index}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label || option.value}
            </option>
          ))}
        </select>
        <span className="select__icon">▼</span>
      </div>
      
      {errorMessage && (
        <span id={`${id}-error`} className="select__error">
          {errorMessage}
        </span>
      )}
      
      {helperText && !errorMessage && (
        <span id={`${id}-helper`} className="select__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Select;
