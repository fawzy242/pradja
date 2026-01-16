import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Checkbox Component (Atom)
 * Reusable checkbox input with label support
 */
const Checkbox = forwardRef(({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  value,
  name,
  id,
  size = 'medium',
  error = false,
  indeterminate = false,
  className = '',
  ...rest
}, ref) => {
  const checkboxClasses = [
    'checkbox',
    `checkbox--${size}`,
    disabled && 'checkbox--disabled',
    error && 'checkbox--error',
    indeterminate && 'checkbox--indeterminate',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={checkboxClasses}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        value={value}
        name={name}
        id={id}
        className="checkbox__input"
        aria-invalid={error}
        {...rest}
      />
      <span className="checkbox__box">
        {indeterminate ? (
          <span className="checkbox__indeterminate" />
        ) : (
          <span className="checkbox__checkmark" />
        )}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.node,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  error: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
