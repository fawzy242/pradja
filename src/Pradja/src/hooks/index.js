/**
 * Custom Hooks Index
 * Export all custom hooks
 */

export { useLocalStorage } from './useLocalStorage';
export { useMediaQuery } from './useMediaQuery';
export { useToggle } from './useToggle';
export { useDebounce } from './useDebounce';
export { useOnClickOutside } from './useOnClickOutside';
export { useScrollPosition } from './useScrollPosition';
export { useIntersectionObserver } from './useIntersectionObserver';

// Re-export context hooks for convenience
export { useAuth } from '../contexts/AuthContext';
export { useTheme } from '../contexts/ThemeContext';
export { useToast } from '../contexts/ToastContext';
export { useModal } from '../contexts/ModalContext';
