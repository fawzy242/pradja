import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

/**
 * SearchBox Component (Molecule)
 * Search input with icon and clear button
 */
const SearchBox = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const [searchValue, setSearchValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(e);
  };

  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onClear?.();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const searchBoxClasses = [
    'search-box',
    `search-box--${size}`,
    fullWidth && 'search-box--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={searchBoxClasses}>
      <Input
        type="search"
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        icon={<span>🔍</span>}
        iconPosition="left"
        {...rest}
      />
      
      {searchValue && (
        <Button
          variant="ghost"
          size={size}
          onClick={handleClear}
          className="search-box__clear"
          aria-label="Clear search"
          icon={<span>✕</span>}
        />
      )}
      
      <Button
        variant="primary"
        size={size}
        onClick={handleSearch}
        disabled={disabled || !searchValue}
        className="search-box__button"
      >
        Search
      </Button>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SearchBox;
