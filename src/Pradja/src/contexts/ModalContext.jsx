import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal Context
 * Global modal management system
 * 
 * @example
 * const { openModal, closeModal } = useModal();
 * openModal(<MyModalContent />);
 */

const ModalContext = createContext(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = useCallback((content, options = {}) => {
    const id = Date.now() + Math.random();
    const modal = {
      id,
      content,
      size: options.size || 'md', // sm, md, lg, xl, full
      closeOnOverlay: options.closeOnOverlay !== false,
      closeOnEsc: options.closeOnEsc !== false,
      title: options.title || '',
      showClose: options.showClose !== false,
    };

    setModals((prev) => [...prev, modal]);
    return id;
  }, []);

  const closeModal = useCallback((id) => {
    if (id) {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    } else {
      // Close topmost modal
      setModals((prev) => prev.slice(0, -1));
    }
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  const value = {
    modals,
    openModal,
    closeModal,
    closeAll,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalRenderer modals={modals} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};

// Modal Renderer Component
const ModalRenderer = ({ modals, closeModal }) => {
  return modals.map((modal) => (
    <ModalOverlay key={modal.id} modal={modal} onClose={() => closeModal(modal.id)} />
  ));
};

// Modal Overlay Component
const ModalOverlay = ({ modal, onClose }) => {
  const { content, size, closeOnOverlay, closeOnEsc, title, showClose } = modal;

  // Handle ESC key
  React.useEffect(() => {
    if (closeOnEsc) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [closeOnEsc, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay animate-fade-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={`modal-content modal-content--${size} animate-fade-in-up`}>
        {(title || showClose) && (
          <div className="modal-header">
            {title && <h3 className="modal-title">{title}</h3>}
            {showClose && (
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{content}</div>
      </div>
    </div>
  );
};

ModalOverlay.propTypes = {
  modal: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalRenderer.propTypes = {
  modals: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContext;
