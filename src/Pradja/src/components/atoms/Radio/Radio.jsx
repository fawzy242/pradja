import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Radio Component (Atom)
 * Reusable radio button input with label support
 */
const Radio = forwardRef(({
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
  className = '',
  ...rest
}, ref) => {
  const radioClasses = [
    'radio',
    `radio--${size}`,
    disabled && 'radio--disabled',
    error && 'radio--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={radioClasses}>
      <input
        ref={ref}
        type="radio"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        value={value}
        name={name}
        id={id}
        className="radio__input"
        aria-invalid={error}
        {...rest}
      />
      <span className="radio__circle">
        <span className="radio__dot" />
      </span>
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.node,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  error: PropTypes.bool,
  className: PropTypes.string,
};

export default Radio;
