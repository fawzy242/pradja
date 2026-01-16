import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';

/**
 * Pagination Component (Molecule)
 * Page navigation for paginated content
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisible = 5,
  showFirstLast = true,
  showPrevNext = true,
  size = 'medium',
  className = '',
}) => {
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const paginationClasses = [
    'pagination',
    `pagination--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const pages = getPageNumbers();

  return (
    <nav className={paginationClasses} aria-label="Pagination">
      <ul className="pagination__list">
        {showFirstLast && (
          <li className="pagination__item">
            <Button
              variant="ghost"
              size={size}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              «
            </Button>
          </li>
        )}
        
        {showPrevNext && (
          <li className="pagination__item">
            <Button
              variant="ghost"
              size={size}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </Button>
          </li>
        )}
        
        {pages[0] > 1 && (
          <li className="pagination__item pagination__item--ellipsis">
            <span>...</span>
          </li>
        )}
        
        {pages.map((page) => (
          <li key={page} className="pagination__item">
            <Button
              variant={page === currentPage ? 'primary' : 'ghost'}
              size={size}
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          </li>
        ))}
        
        {pages[pages.length - 1] < totalPages && (
          <li className="pagination__item pagination__item--ellipsis">
            <span>...</span>
          </li>
        )}
        
        {showPrevNext && (
          <li className="pagination__item">
            <Button
              variant="ghost"
              size={size}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </Button>
          </li>
        )}
        
        {showFirstLast && (
          <li className="pagination__item">
            <Button
              variant="ghost"
              size={size}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              »
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  maxVisible: PropTypes.number,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Pagination;
