import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Calendar, Check, AlertCircle, Clock, FileText } from 'lucide-react';

const mockAudits = [
  {
    id: 1,
    type: 'SEC Annual Review',
    status: 'Upcoming',
    dueDate: '2024-03-15',
    assignedTo: 'Jane Cooper',
    items: [
      { id: 1, name: 'Form ADV Review', status: 'Pending' },
      { id: 2, name: 'Fee Calculation Audit', status: 'In Progress' },
      { id: 3, name: 'Marketing Materials Review', status: 'Completed' }
    ]
  },
  {
    id: 2,
    type: 'Internal Quarterly Review',
    status: 'In Progress',
    dueDate: '2024-02-01',
    assignedTo: 'Robert Fox',
    items: [
      { id: 4, name: 'Client Agreement Review', status: 'Completed' },
      { id: 5, name: 'Trading Documentation', status: 'In Progress' },
      { id: 6, name: 'Employee Correspondence', status: 'Pending' }
    ]
  }
];

const AuditCard = ({ audit }) => {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    'Upcoming': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Overdue': 'bg-red-100 text-red-800'
  };

  const itemStatusIcons = {
    'Pending': Clock,
    'In Progress': AlertCircle,
    'Completed': Check
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-medium">{audit.type}</h3>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Due: {audit.dueDate}</span>
              </div>
              <div>Assigned to: {audit.assignedTo}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm rounded-full ${statusColors[audit.status]}`}>
              {audit.status}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDetails(true)}
            >
              View Details
            </Button>
          </div>
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{audit.type} Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Status</span>
                  <div className={`mt-1 px-3 py-1 text-sm rounded-full inline-block ${statusColors[audit.status]}`}>
                    {audit.status}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Due Date</span>
                  <div className="mt-1">{audit.dueDate}</div>
                </div>
                <div>
                  <span className="text-gray-500">Assigned To</span>
                  <div className="mt-1">{audit.assignedTo}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Audit Items</h4>
                <div className="space-y-3">
                  {audit.items.map(item => {
                    const StatusIcon = itemStatusIcons[item.status];
                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <span>{item.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const AuditView = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-normal">Compliance Audits</h1>
        <h2 className="text-2xl text-gray-500">Track & Manage</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockAudits.map(audit => (
          <AuditCard key={audit.id} audit={audit} />
        ))}
      </div>
    </div>
  );
};

export default AuditView;