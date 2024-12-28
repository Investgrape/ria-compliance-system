import { useState, useEffect } from 'react';
import { useCompliance } from '@/contexts/ComplianceContext';

export function useAgreements() {
  const { state, fetchAgreements, createAgreement } = useCompliance();
  const [filteredAgreements, setFilteredAgreements] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: ''
  });

  useEffect(() => {
    fetchAgreements();
  }, []);

  useEffect(() => {
    const filtered = state.agreements.filter(agreement => {
      const matchesSearch = 
        agreement.clientName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || agreement.status === filters.status;
      const matchesType = !filters.type || agreement.type === filters.type;
      return matchesSearch && matchesStatus && matchesType;
    });
    setFilteredAgreements(filtered);
  }, [state.agreements, filters]);

  return {
    agreements: filteredAgreements,
    loading: state.loading,
    error: state.error,
    setFilters,
    createAgreement
  };
}