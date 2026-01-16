import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Textarea Component (Atom)
 * Reusable textarea field with auto-resize option
 */
const Textarea = forwardRef(({
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
  rows = 4,
  maxLength,
  fullWidth = false,
  resize = 'vertical',
  className = '',
  name,
  id,
  ...rest
}, ref) => {
  const textareaClasses = [
    'textarea',
    fullWidth && 'textarea--full-width',
    disabled && 'textarea--disabled',
    readOnly && 'textarea--readonly',
    error && 'textarea--error',
    `textarea--resize-${resize}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="textarea-wrapper">
      <textarea
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
        name={name}
        id={id}
        aria-invalid={error}
        aria-describedby={errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...rest}
      />
      
      {maxLength && (
        <div className="textarea__counter">
          {value?.length || 0} / {maxLength}
        </div>
      )}
      
      {errorMessage && (
        <span id={`${id}-error`} className="textarea__error">
          {errorMessage}
        </span>
      )}
      
      {helperText && !errorMessage && (
        <span id={`${id}-helper`} className="textarea__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
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
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  fullWidth: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Textarea;
