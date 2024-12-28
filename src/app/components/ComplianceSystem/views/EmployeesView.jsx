import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Mail, Phone, Calendar, Shield, AlertTriangle, Search, Filter, Plus, CheckCircle } from 'lucide-react';

const mockEmployees = [
  {
    id: 1,
    name: 'Jane Cooper',
    role: 'Investment Advisor',
    email: 'jane.cooper@example.com',
    phone: '(555) 123-4567',
    startDate: '2023-01-15',
    licenses: ['Series 7', 'Series 66'],
    certifications: ['CFP'],
    complianceStatus: 'Compliant',
    alerts: [],
    lastReview: '2024-01-10',
    nextReview: '2024-04-10'
  },
  {
    id: 2,
    name: 'Robert Fox',
    role: 'Senior Advisor',
    email: 'robert.fox@example.com',
    phone: '(555) 234-5678',
    startDate: '2022-06-01',
    licenses: ['Series 7', 'Series 66', 'Series 24'],
    certifications: ['CFA'],
    complianceStatus: 'Review Required',
    alerts: ['CE Credits Due', 'License Renewal Required'],
    lastReview: '2023-12-15',
    nextReview: '2024-03-15'
  }
];

const AddEmployeeDialog = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    startDate: '',
    licenses: [],
    certifications: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New employee data:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Add Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EmployeeCard = ({ employee }) => {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    'Compliant': 'bg-green-100 text-green-800',
    'Review Required': 'bg-yellow-100 text-yellow-800',
    'Non-Compliant': 'bg-red-100 text-red-800'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-medium">{employee.name}</h3>
              <div className="text-sm text-gray-500">{employee.role}</div>
              <div className="flex gap-4 mt-1 text-sm text-gray-500">
                <span>Last Review: {employee.lastReview}</span>
                <span>Next Review: {employee.nextReview}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm rounded-full ${statusColors[employee.complianceStatus]}`}>
              {employee.complianceStatus}
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

        {/* Employee Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Contact Information</span>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{employee.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Employment Details</span>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Started: {employee.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span>Last Review: {employee.lastReview}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Licenses</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {employee.licenses.map(license => (
                        <span 
                          key={license}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                        >
                          {license}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Certifications</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {employee.certifications.map(cert => (
                        <span 
                          key={cert}
                          className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {employee.alerts.length > 0 && (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Compliance Alerts</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {employee.alerts.map(alert => (
                      <li key={alert} className="text-sm text-yellow-700">{alert}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Close
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Update Compliance Status
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EmployeesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || employee.complianceStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Employees</h1>
          <h2 className="text-2xl text-gray-500">Compliance & Licensing</h2>
        </div>
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={() => setShowAddEmployee(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search employees..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Compliant">Compliant</option>
          <option value="Review Required">Review Required</option>
          <option value="Non-Compliant">Non-Compliant</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      <AddEmployeeDialog 
        open={showAddEmployee} 
        onOpenChange={setShowAddEmployee} 
      />
    </div>
  );
};

export default EmployeesView;