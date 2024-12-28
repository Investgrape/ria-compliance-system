import { useState, useEffect } from 'react';
import { useCompliance } from '@/contexts/ComplianceContext';

export function useEmployees() {
  const { state, fetchEmployees, createEmployee } = useCompliance();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = state.employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.role.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || employee.complianceStatus === filters.status;
      const matchesRole = !filters.role || employee.role === filters.role;
      return matchesSearch && matchesStatus && matchesRole;
    });
    setFilteredEmployees(filtered);
  }, [state.employees, filters]);

  return {
    employees: filteredEmployees,
    loading: state.loading,
    error: state.error,
    setFilters,
    createEmployee
  };
}