import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from '../../atoms';
import { Pagination } from '../../molecules';

/**
 * DataTable Component (Organism)
 * Sortable, filterable data table
 */
const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  pagination = false,
  pageSize = 10,
  sortable = true,
  className = '',
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(data.length / pageSize);

  if (loading) {
    return (
      <div className="data-table__loading">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`}>
      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead className="data-table__header">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`data-table__header-cell ${
                    sortable && column.sortable !== false ? 'data-table__header-cell--sortable' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  {column.label}
                  {sortable && sortConfig.key === column.key && (
                    <span className="data-table__sort-icon">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="data-table__body">
            {paginatedData.map((row, index) => (
              <tr key={row.id || index} className="data-table__row">
                {columns.map((column) => (
                  <td key={column.key} className="data-table__cell">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && totalPages > 1 && (
        <div className="data-table__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  sortable: PropTypes.bool,
  className: PropTypes.string,
};

export default DataTable;
