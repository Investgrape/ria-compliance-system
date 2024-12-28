import React, { useState } from 'react';
import { Search, Menu, User, BarChart, Users, Shield, MessageSquare, Mail, Calendar, Settings, HelpCircle } from 'lucide-react';

const ComplianceSystem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { icon: BarChart, label: 'Dashboard', id: 'dashboard' },
    { icon: Users, label: 'Employees', id: 'employees' },
    { icon: Shield, label: 'Audit', id: 'audit' },
    { icon: MessageSquare, label: 'Marketing', id: 'marketing' },
    { icon: Mail, label: 'Email Monitor', id: 'email' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-500" />
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <button className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
            <HelpCircle className="w-5 h-5" />
            {isSidebarOpen && <span>Help Center</span>}
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
              <Menu 
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-semibold mb-6">RIA Compliance System</h1>
          <p>Welcome to your compliance dashboard.</p>
        </main>
      </div>
    </div>
  );
};

export default ComplianceSystem;