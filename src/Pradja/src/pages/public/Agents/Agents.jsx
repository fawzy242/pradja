import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { agentService } from '../../../services/mock';
import { AgentCard } from '../../../components/organisms';
import { SearchBox, Pagination } from '../../../components/molecules';
import { Spinner } from '../../../components/atoms';

/**
 * Agents Page
 * Browse and search all agents
 */
const Agents = () => {
  const { t } = useTranslation();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 12;

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const response = await agentService.getAllAgents();
      if (response.success) {
        setAgents(response.data);
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (query.trim()) {
      try {
        setLoading(true);
        const response = await agentService.searchAgents(query);
        if (response.success) {
          setAgents(response.data);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      loadAgents();
    }
  };

  const handleContactAgent = (agent) => {
    // Navigate to contact form or open modal
    console.log('Contact agent:', agent);
  };

  const filteredAgents = searchQuery
    ? agents
    : agents;

  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);
  const startIndex = (currentPage - 1) * agentsPerPage;
  const paginatedAgents = filteredAgents.slice(startIndex, startIndex + agentsPerPage);

  return (
    <div className="agents-page">
      {/* Header */}
      <section className="agents-page__header section section--gray">
        <div className="container">
          <h1 className="agents-page__title">Our Expert Agents</h1>
          <p className="agents-page__subtitle">
            Connect with professional real estate agents to help you find your perfect property
          </p>
          
          <div className="agents-page__search">
            <SearchBox
              placeholder="Search agents by name, specialization..."
              onSearch={handleSearch}
              size="large"
            />
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="agents-page__content section">
        <div className="container">
          {loading ? (
            <div className="agents-page__loading">
              <Spinner size="large" />
              <p>Loading agents...</p>
            </div>
          ) : paginatedAgents.length === 0 ? (
            <div className="agents-page__empty">
              <p>No agents found</p>
            </div>
          ) : (
            <>
              <div className="grid grid--cols-3">
                {paginatedAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onContact={handleContactAgent}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="agents-page__pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Agents;
