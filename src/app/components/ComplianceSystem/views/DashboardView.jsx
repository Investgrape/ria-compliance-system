import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileText, Shield, AlertTriangle } from 'lucide-react';

const mockData = {
  agreements: [
    { month: 'Jan', count: 65 },
    { month: 'Feb', count: 59 },
    { month: 'Mar', count: 80 },
    { month: 'Apr', count: 81 },
    { month: 'May', count: 56 },
    { month: 'Jun', count: 55 },
  ],
  stats: {
    totalClients: 246,
    pendingAgreements: 12,
    upcomingAudits: 3,
    complianceAlerts: 5
  }
};

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <span className="text-sm text-gray-500">{label}</span>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const DashboardView = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-normal">Dashboard</h1>
        <h2 className="text-2xl text-gray-500">Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Users} 
          label="Total Clients" 
          value={mockData.stats.totalClients}
        />
        <StatCard 
          icon={FileText} 
          label="Pending Agreements" 
          value={mockData.stats.pendingAgreements}
        />
        <StatCard 
          icon={Shield} 
          label="Upcoming Audits" 
          value={mockData.stats.upcomingAudits}
        />
        <StatCard 
          icon={AlertTriangle} 
          label="Compliance Alerts" 
          value={mockData.stats.complianceAlerts}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Agreement Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.agreements}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={{ fill: '#10B981' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;