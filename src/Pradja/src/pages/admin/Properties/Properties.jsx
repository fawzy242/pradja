import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../../../services/mock';
import { DataTable } from '../../../components/organisms';
import { Button } from '../../../components/atoms';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

/**
 * Admin Properties Page
 * Manage properties (CRUD operations)
 */
const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyService.getAllProperties();
      if (response.success) {
        setProperties(response.data);
      }
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate('/admin/properties/create');
  };

  const handleEdit = (property) => {
    navigate(`/admin/properties/edit/${property.id}`);
  };

  const handleView = (property) => {
    navigate(`/properties/${property.id}`);
  };

  const handleDelete = async (property) => {
    if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
      try {
        await propertyService.deleteProperty(property.id);
        loadProperties();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const columns = [
    { 
      key: 'id', 
      label: 'ID',
      sortable: true,
      width: '80px'
    },
    { 
      key: 'title', 
      label: 'Property Title',
      sortable: true
    },
    { 
      key: 'location', 
      label: 'Location',
      sortable: true
    },
    { 
      key: 'price', 
      label: 'Price',
      sortable: true,
      render: (val) => `Rp ${val.toLocaleString('id-ID')}`
    },
    { 
      key: 'type', 
      label: 'Type',
      sortable: true
    },
    { 
      key: 'status', 
      label: 'Status',
      sortable: true,
      render: (val) => (
        <span className={`badge badge--${val === 'For Sale' ? 'success' : 'info'}`}>
          {val}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      width: '200px',
      render: (_, row) => (
        <div className="table-actions">
          <Button 
            size="small" 
            variant="ghost" 
            onClick={() => handleView(row)}
            title="View"
          >
            <FiEye />
          </Button>
          <Button 
            size="small" 
            variant="ghost" 
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FiEdit2 />
          </Button>
          <Button 
            size="small" 
            variant="ghost" 
            className="text-danger"
            onClick={() => handleDelete(row)}
            title="Delete"
          >
            <FiTrash2 />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-properties-page">
      <div className="page-header">
        <div className="page-header__content">
          <h1 className="page-header__title">Properties Management</h1>
          <p className="page-header__subtitle">
            Manage all property listings
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FiPlus /> Add Property
        </Button>
      </div>
      
      <div className="page-content">
        <DataTable
          columns={columns}
          data={properties}
          loading={loading}
          pagination
          pageSize={10}
          searchable
          searchPlaceholder="Search properties..."
        />
      </div>
    </div>
  );
};

export default Properties;
