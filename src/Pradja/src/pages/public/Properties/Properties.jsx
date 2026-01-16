import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiSearch,
  FiFilter,
  FiMapPin,
  FiHome,
  FiDroplet,
  FiMaximize,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';

/**
 * Properties Page Component
 * Property listing with filtering, search, and sorting
 * 
 * @component
 * @example
 * <PropertiesPage />
 */
const PropertiesPage = () => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter states
  const [filters, setFilters] = useState({
    type: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    location: 'all',
  });

  // Mock properties data (will be replaced with real data)
  const allProperties = [
    {
      id: 1,
      title: 'Modern Apartment in Central Jakarta',
      location: 'Sudirman, Jakarta Pusat',
      price: 2500000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: 'https://via.placeholder.com/400x300/1a4d2e/ffffff?text=Property+1',
      type: 'Apartment',
      status: 'For Sale',
      createdAt: '2025-01-01',
    },
    {
      id: 2,
      title: 'Luxury Villa with Ocean View',
      location: 'Bali',
      price: 5000000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 300,
      image: 'https://via.placeholder.com/400x300/c8a882/ffffff?text=Property+2',
      type: 'Villa',
      status: 'For Sale',
      createdAt: '2025-01-02',
    },
    {
      id: 3,
      title: 'Contemporary House in BSD',
      location: 'BSD City, Tangerang',
      price: 3200000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      image: 'https://via.placeholder.com/400x300/1a4d2e/ffffff?text=Property+3',
      type: 'House',
      status: 'For Sale',
      createdAt: '2025-01-03',
    },
    {
      id: 4,
      title: 'Minimalist Studio Apartment',
      location: 'Menteng, Jakarta',
      price: 800000000,
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: 'https://via.placeholder.com/400x300/c8a882/ffffff?text=Property+4',
      type: 'Apartment',
      status: 'For Rent',
      createdAt: '2025-01-04',
    },
    {
      id: 5,
      title: 'Family House with Garden',
      location: 'Pondok Indah, Jakarta',
      price: 4500000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 280,
      image: 'https://via.placeholder.com/400x300/1a4d2e/ffffff?text=Property+5',
      type: 'House',
      status: 'For Sale',
      createdAt: '2025-01-05',
    },
    {
      id: 6,
      title: 'Beachfront Villa in Bali',
      location: 'Canggu, Bali',
      price: 7000000000,
      bedrooms: 6,
      bathrooms: 5,
      area: 400,
      image: 'https://via.placeholder.com/400x300/c8a882/ffffff?text=Property+6',
      type: 'Villa',
      status: 'For Sale',
      createdAt: '2025-01-06',
    },
  ];

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter((property) => property.type === filters.type);
    }

    // Price filter
    if (filters.priceMin) {
      result = result.filter((property) => property.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((property) => property.price <= Number(filters.priceMax));
    }

    // Bedrooms filter
    if (filters.bedrooms !== 'any') {
      result = result.filter((property) => property.bedrooms >= Number(filters.bedrooms));
    }

    // Bathrooms filter
    if (filters.bathrooms !== 'any') {
      result = result.filter((property) => property.bathrooms >= Number(filters.bathrooms));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [allProperties, searchQuery, filters, sortBy]);

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: 'all',
      priceMin: '',
      priceMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      location: 'all',
    });
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.type !== 'all' ||
      filters.priceMin ||
      filters.priceMax ||
      filters.bedrooms !== 'any' ||
      filters.bathrooms !== 'any' ||
      searchQuery
    );
  }, [filters, searchQuery]);

  return (
    <div className="properties-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-header__title">
            {t('properties.title') || 'Property Listings'}
          </h1>
          <p className="page-header__subtitle">
            {t('properties.subtitle', { count: filteredProperties.length })}
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="properties-layout">
          {/* Sidebar Filters - Desktop */}
          <aside className="properties-sidebar">
            <div className="filter-panel">
              <div className="filter-panel__header">
                <h3 className="filter-panel__title">
                  {t('properties.filters.title') || 'Filters'}
                </h3>
                {hasActiveFilters && (
                  <button
                    className="filter-panel__clear"
                    onClick={clearFilters}
                    type="button"
                  >
                    {t('properties.filters.clear') || 'Clear All'}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-group__label">
                  {t('properties.filters.search') || 'Search'}
                </label>
                <div className="search-input">
                  <FiSearch className="search-input__icon" />
                  <input
                    type="text"
                    placeholder={t('properties.filters.searchPlaceholder') || 'Search properties...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input__field"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="filter-group">
                <label className="filter-group__label">
                  {t('properties.filters.type') || 'Property Type'}
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="filter-group__select"
                >
                  <option value="all">{t('properties.filters.allTypes') || 'All Types'}</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label className="filter-group__label">
                  {t('properties.filters.price') || 'Price Range'}
                </label>
                <div className="filter-group__row">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    className="filter-group__input"
                  />
                  <span className="filter-group__separator">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    className="filter-group__input"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="filter-group">
                <label className="filter-group__label">
                  {t('properties.filters.bedrooms') || 'Bedrooms'}
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="filter-group__select"
                >
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div className="filter-group">
                <label className="filter-group__label">
                  {t('properties.filters.bathrooms') || 'Bathrooms'}
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                  className="filter-group__select"
                >
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="properties-main">
            {/* Mobile Filter Toggle & Sort */}
            <div className="properties-toolbar">
              <button
                className="button button--outline button--sm"
                onClick={() => setShowFilters(!showFilters)}
                type="button"
              >
                <FiFilter />
                <span>{t('properties.filters.show') || 'Filters'}</span>
              </button>

              <div className="sort-select">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select__field"
                >
                  <option value="newest">{t('properties.sort.newest') || 'Newest First'}</option>
                  <option value="oldest">{t('properties.sort.oldest') || 'Oldest First'}</option>
                  <option value="price-low">{t('properties.sort.priceLow') || 'Price: Low to High'}</option>
                  <option value="price-high">{t('properties.sort.priceHigh') || 'Price: High to Low'}</option>
                </select>
                <FiChevronDown className="sort-select__icon" />
              </div>
            </div>

            {/* Results Count */}
            <div className="properties-results">
              <p className="properties-results__text">
                {t('properties.results', { count: filteredProperties.length }) ||
                  `${filteredProperties.length} properties found`}
              </p>
            </div>

            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid--responsive grid--gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="property-card">
                    <div className="property-card__image-wrapper">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="property-card__image"
                      />
                      <div className="property-card__badge-group">
                        <span className="badge badge--primary">{property.status}</span>
                        <span className="badge badge--secondary">{property.type}</span>
                      </div>
                    </div>

                    <div className="property-card__body">
                      <div className="property-card__price">{formatPrice(property.price)}</div>
                      <h3 className="property-card__title">{property.title}</h3>
                      <div className="property-card__location">
                        <FiMapPin />
                        <span>{property.location}</span>
                      </div>

                      <div className="property-card__features">
                        <div className="property-card__feature">
                          <FiHome />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="property-card__feature">
                          <FiDroplet />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                        <div className="property-card__feature">
                          <FiMaximize />
                          <span>{property.area} m²</span>
                        </div>
                      </div>

                      <Link
                        to={`/properties/${property.id}`}
                        className="button button--outline button--full-width"
                      >
                        {t('properties.viewDetails') || 'View Details'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state__icon">
                  <FiSearch />
                </div>
                <h3 className="empty-state__title">
                  {t('properties.noResults') || 'No properties found'}
                </h3>
                <p className="empty-state__description">
                  {t('properties.noResultsDesc') || 'Try adjusting your filters or search terms'}
                </p>
                <button
                  className="button button--primary"
                  onClick={clearFilters}
                  type="button"
                >
                  {t('properties.clearFilters') || 'Clear Filters'}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="filter-modal">
          <div className="filter-modal__overlay" onClick={() => setShowFilters(false)} />
          <div className="filter-modal__content">
            <div className="filter-modal__header">
              <h3 className="filter-modal__title">Filters</h3>
              <button
                className="filter-modal__close"
                onClick={() => setShowFilters(false)}
                type="button"
              >
                <FiX />
              </button>
            </div>
            <div className="filter-modal__body">
              {/* Same filters as sidebar */}
              <div className="filter-panel">
                {/* Filter content here - duplicate from sidebar */}
              </div>
            </div>
            <div className="filter-modal__footer">
              <button
                className="button button--outline button--full-width"
                onClick={clearFilters}
                type="button"
              >
                Clear All
              </button>
              <button
                className="button button--primary button--full-width"
                onClick={() => setShowFilters(false)}
                type="button"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
