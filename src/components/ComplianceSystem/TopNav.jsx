import React from 'react';
import { Search, Menu } from 'lucide-react';

const TopNav = ({ isSidebarOpen, setIsSidebarOpen }) => (
  <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between px-4 h-16">
      <div className="flex items-center gap-4">
        <Menu 
          className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
);

export default TopNav;