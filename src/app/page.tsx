'use client';

import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sample stats cards */}
          {['Total Clients', 'Active Agreements', 'Pending Reviews', 'Compliance Alerts'].map((title) => (
            <div key={title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-sm">{title}</h3>
              <p className="text-2xl font-semibold mt-2">0</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}