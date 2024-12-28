import React from 'react';
import { BarChart, FileText, Users, Shield, MessageSquare, Mail, Calendar, Settings, HelpCircle } from 'lucide-react';

const sidebarItems = [
  { icon: BarChart, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'Client Agreements', id: 'agreements' },
  { icon: Users, label: 'Employees', id: 'employees' },
  { icon: Shield, label: 'Audit', id: 'audit' },
  { icon: MessageSquare, label: 'Marketing', id: 'marketing' },
  { icon: Mail, label: 'Email Monitor', id: 'email' },
  { icon: Calendar, label: 'Calendar', id: 'calendar' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

const Sidebar = ({ isSidebarOpen, setActiveSection, activeSection }) => {
  return (
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
  );
};

export default Sidebar;