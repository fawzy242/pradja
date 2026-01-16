import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';

/**
 * Dropdown Component (Molecule)
 * Dropdown menu with trigger and options
 */
const Dropdown = ({
  trigger,
  children,
  items = [],
  position = 'bottom-left',
  disabled = false,
  closeOnSelect = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const dropdownClasses = [
    'dropdown',
    `dropdown--${position}`,
    isOpen && 'dropdown--open',
    disabled && 'dropdown--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={dropdownRef} className={dropdownClasses}>
      <div className="dropdown__trigger" onClick={handleToggle}>
        {trigger || <Button>Menu ▼</Button>}
      </div>
      
      {isOpen && (
        <div className="dropdown__menu">
          {children || (
            <ul className="dropdown__list">
              {items.map((item, index) => (
                <li
                  key={item.key || index}
                  className={`dropdown__item ${item.disabled ? 'dropdown__item--disabled' : ''}`}
                  onClick={() => !item.disabled && handleItemClick(item)}
                >
                  {item.icon && <span className="dropdown__item-icon">{item.icon}</span>}
                  <span className="dropdown__item-label">{item.label}</span>
                  {item.badge && <span className="dropdown__item-badge">{item.badge}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node,
  children: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.node,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ),
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),
  disabled: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  className: PropTypes.string,
};

export default Dropdown;
