import React, { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import DashboardView from './views/DashboardView';
import ClientAgreementsView from './views/ClientAgreementsView';
import AuditView from './views/AuditView';
import EmployeesView from './views/EmployeesView';
import EmailMonitorView from './views/EmailMonitorView';

const ComplianceSystem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const MainContent = () => {
    switch(activeSection) {
      case 'agreements':
        return <ClientAgreementsView />;
      case 'audit':
        return <AuditView />;
      case 'employees':
        return <EmployeesView />;
      case 'email':
        return <EmailMonitorView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setActiveSection={setActiveSection} 
        activeSection={activeSection} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default ComplianceSystem;