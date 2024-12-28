import { createContext, useContext, useReducer } from 'react';

const ComplianceContext = createContext();

const initialState = {
  agreements: [],
  employees: [],
  audits: [],
  loading: false,
  error: null
};

function complianceReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_AGREEMENTS':
      return { ...state, agreements: action.payload };
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    case 'SET_AUDITS':
      return { ...state, audits: action.payload };
    case 'ADD_AGREEMENT':
      return { ...state, agreements: [...state.agreements, action.payload] };
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'ADD_AUDIT':
      return { ...state, audits: [...state.audits, action.payload] };
    case 'UPDATE_AGREEMENT':
      return {
        ...state,
        agreements: state.agreements.map(agreement =>
          agreement.id === action.payload.id ? action.payload : agreement
        )
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        )
      };
    default:
      return state;
  }
}

export function ComplianceProvider({ children }) {
  const [state, dispatch] = useReducer(complianceReducer, initialState);

  // Fetch data functions
  const fetchAgreements = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/agreements');
      const data = await response.json();
      dispatch({ type: 'SET_AGREEMENTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchEmployees = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      dispatch({ type: 'SET_EMPLOYEES', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Create data functions
  const createAgreement = async (agreementData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/agreements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agreementData)
      });
      const data = await response.json();
      dispatch({ type: 'ADD_AGREEMENT', payload: data });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createEmployee = async (employeeData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      const data = await response.json();
      dispatch({ type: 'ADD_EMPLOYEE', payload: data });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    state,
    fetchAgreements,
    fetchEmployees,
    createAgreement,
    createEmployee
  };

  return (
    <ComplianceContext.Provider value={value}>
      {children}
    </ComplianceContext.Provider>
  );
}

export function useCompliance() {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
}
