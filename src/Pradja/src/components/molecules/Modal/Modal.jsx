import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';

/**
 * Modal Component (Molecule)
 * Overlay dialog for displaying content
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  centered = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const modalClasses = [
    'modal',
    `modal--${size}`,
    centered && 'modal--centered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={modalClasses} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && <h2 id="modal-title" className="modal__title">{title}</h2>}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="small"
                onClick={onClose}
                className="modal__close"
                aria-label="Close modal"
                icon={<span>✕</span>}
              />
            )}
          </div>
        )}
        
        <div className="modal__content">
          {children}
        </div>
        
        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'fullscreen']),
  centered: PropTypes.bool,
  closeOnOverlay: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
};

export default Modal;
