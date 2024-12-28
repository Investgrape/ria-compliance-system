import { useState } from 'react';
import { BarChart, FileText, Users, Shield, Menu } from 'lucide-react';

const menuItems = [
  { icon: BarChart, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'Agreements', id: 'agreements' },
  { icon: Users, label: 'Employees', id: 'employees' },
  { icon: Shield, label: 'Audit', id: 'audit' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState('dashboard');

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg" />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} />
          </button>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active === item.id ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}