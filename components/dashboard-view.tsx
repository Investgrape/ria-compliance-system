import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, Users, FileText, AlertCircle } from 'lucide-react';

const mockData = {
  clientStats: [
    { month: 'Jan', clients: 150, revenue: 45000 },
    { month: 'Feb', clients: 165, revenue: 52000 },
    { month: 'Mar', clients: 180, revenue: 58000 },
    { month: 'Apr', clients: 195, revenue: 63000 },
    { month: 'May', clients: 210, revenue: 68000 }
  ],
  complianceStats: [
    { month: 'Jan', completed: 45, pending: 5 },
    { month: 'Feb', completed: 38, pending: 7 },
    { month: 'Mar', completed: 52, pending: 3 },
    { month: 'Apr', completed: 48, pending: 6 },
    { month: 'May', completed: 55, pending: 4 }
  ]
};

export function DashboardView() {
  const stats = [
    {
      title: 'Total Clients',
      value: '210',
      change: '+12.5%',
      icon: Users
    },
    {
      title: 'Active Agreements',
      value: '185',
      change: '+8.2%',
      icon: FileText
    },
    {
      title: 'Compliance Score',
      value: '98%',
      change: '+2.1%',
      icon: AlertCircle
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500">Overview of your RIA compliance</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-emerald-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Client Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.clientStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  stroke="#10B981" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Compliance Tasks</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.complianceStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
                <Bar dataKey="pending" fill="#FBBF24" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
