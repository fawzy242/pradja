import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentService } from '../../../services/mock';
import { DataTable } from '../../../components/organisms';
import { Button } from '../../../components/atoms';
import { Card, CardHeader, CardBody } from '../../../components/molecules/Card';
import Avatar from '../../../components/atoms/Avatar';
import { FiUsers, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

const Agents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const response = await agentService.getAllAgents();
      if (response.success) setAgents(response.data);
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate('/admin/agents/create');
  };

  const handleEdit = (agent) => {
    navigate(`/admin/agents/edit/${agent.id}`);
  };

  const handleDelete = async (agent) => {
    if (window.confirm(`Delete agent "${agent.name}"?`)) {
      try {
        await agentService.deleteAgent(agent.id);
        loadAgents();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const columns = [
    { 
      key: 'avatar', 
      label: 'Avatar',
      sortable: false,
      render: (_, row) => (
        <div className="table-cell-avatar">
          <Avatar 
            src={row.photo} 
            name={row.name} 
            size="sm"
          />
        </div>
      ),
    },
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { 
      key: 'email', 
      label: 'Email',
      render: (val) => (
        <a href={`mailto:${val}`} className="table-link">
          <FiMail className="table-link__icon" />
          {val}
        </a>
      ),
    },
    { 
      key: 'phone', 
      label: 'Phone',
      render: (val) => (
        <a href={`tel:${val}`} className="table-link">
          <FiPhone className="table-link__icon" />
          {val}
        </a>
      ),
    },
    { key: 'specialization', label: 'Specialization' },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="table-actions">
          <Button 
            size="small" 
            variant="outline"
            icon={<FiEdit2 />}
            onClick={() => handleEdit(row)}
            title="Edit agent"
          >
            Edit
          </Button>
          <Button 
            size="small" 
            variant="danger"
            icon={<FiTrash2 />}
            onClick={() => handleDelete(row)}
            title="Delete agent"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-agents-page">
      <div className="page-header">
        <div className="page-header__title-wrapper">
          <FiUsers className="page-header__icon" />
          <div>
            <h1 className="page-header__title">Agents Management</h1>
            <p className="page-header__description">
              Manage your real estate agents and their information
            </p>
          </div>
        </div>
        <div className="page-header__actions">
          <Button 
            variant="primary"
            icon={<FiPlus />}
            onClick={handleCreate}
          >
            Add Agent
          </Button>
        </div>
      </div>

      <div className="admin-agents-page__content">
        <Card className="agents-table-card">
          <CardHeader>
            <div className="card-header__content">
              <h2 className="card__title">All Agents</h2>
              <div className="card-header__search">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          
          <CardBody>
            <DataTable 
              columns={columns} 
              data={filteredAgents} 
              loading={loading} 
              pagination 
              pageSize={10}
              emptyMessage="No agents found"
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Agents;
