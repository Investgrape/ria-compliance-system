import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, BarChart, Users, FileText, Settings, Calendar, HelpCircle, Shield } from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

export function ComplianceSystem() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarItems: SidebarItem[] = [
    { icon: BarChart, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Agreements', id: 'agreements' },
    { icon: Users, label: 'Clients', id: 'clients' },
    { icon: Shield, label: 'Compliance', id: 'compliance' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-500" />
            {isSidebarOpen && <span className="ml-3 font-medium">RIA Compliance</span>}
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <button className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
            <HelpCircle className="w-5 h-5" />
            {isSidebarOpen && <span>Help</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Support
              </Button>
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Content will be rendered here based on activeSection */}
          <div className="max-w-7xl mx-auto">
            {activeSection === 'dashboard' && <h1 className="text-2xl font-semibold">Dashboard</h1>}
            {activeSection === 'agreements' && <h1 className="text-2xl font-semibold">Agreements</h1>}
            {activeSection === 'clients' && <h1 className="text-2xl font-semibold">Clients</h1>}
            {activeSection === 'compliance' && <h1 className="text-2xl font-semibold">Compliance</h1>}
            {activeSection === 'calendar' && <h1 className="text-2xl font-semibold">Calendar</h1>}
            {activeSection === 'settings' && <h1 className="text-2xl font-semibold">Settings</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}
