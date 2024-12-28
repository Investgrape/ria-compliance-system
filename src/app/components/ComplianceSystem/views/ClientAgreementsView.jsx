import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plus, Eye, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AgreementForm from '../forms/AgreementForm';

const mockAgreements = [
  {
    id: 1,
    clientName: "John Smith",
    type: "Wrap Fee Agreement",
    status: "Pending Signature",
    created: "2024-01-20",
    feeAmount: "1.25%",
    isRollover: true
  },
  {
    id: 2,
    clientName: "Sarah Johnson",
    type: "Wrap Fee Agreement",
    status: "Signed",
    created: "2024-01-15",
    feeAmount: "1%",
    isRollover: false
  },
  {
    id: 3,
    clientName: "Michael Brown",
    type: "Wrap Fee Agreement",
    status: "Signed",
    created: "2024-01-10",
    feeAmount: "1.5%",
    isRollover: true
  }
];

const AgreementPreview = ({ formData, onClose, onConfirm }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">INVESTMENT ADVISORY AGREEMENT</h3>
      <p>This Agreement is made between {formData?.clientName} ("Client") and Your Firm Name ("Advisor").</p>
      <div className="mt-4">
        <h4 className="font-medium">Account Details:</h4>
        <p>Account Type: {formData?.accountType}</p>
        <p>Annual Fee: {formData?.feeAmount}%</p>
        {formData?.isRollover && <p>This is a rollover account</p>}
      </div>
      <div className="mt-4">
        <h4 className="font-medium">Contact Information:</h4>
        <p>Email: {formData?.email}</p>
      </div>
    </div>
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={onClose}>
        Edit
      </Button>
      <Button 
        className="bg-emerald-500 hover:bg-emerald-600 text-white"
        onClick={onConfirm}
      >
        Generate & Send
      </Button>
    </div>
  </div>
);

const FilterBar = ({ onFilterChange }) => (
  <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Search agreements..."
        className="pl-9"
        onChange={(e) => onFilterChange({ search: e.target.value })}
      />
    </div>
    <select
      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      onChange={(e) => onFilterChange({ status: e.target.value })}
    >
      <option value="">All Status</option>
      <option value="Signed">Signed</option>
      <option value="Pending Signature">Pending Signature</option>
    </select>
    <select
      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      onChange={(e) => onFilterChange({ type: e.target.value })}
    >
      <option value="">All Types</option>
      <option value="Wrap Fee Agreement">Wrap Fee Agreement</option>
      <option value="Financial Planning">Financial Planning</option>
    </select>
  </div>
);

const ClientAgreementsView = () => {
  const [showNewAgreement, setShowNewAgreement] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '', type: '' });

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowPreview(true);
    setShowNewAgreement(false);
  };

  const handleConfirm = () => {
    console.log('Agreement confirmed:', formData);
    setShowPreview(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const filteredAgreements = mockAgreements.filter(agreement => {
    const matchesSearch = agreement.clientName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || agreement.status === filters.status;
    const matchesType = !filters.type || agreement.type === filters.type;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Client Agreements</h1>
          <h2 className="text-2xl text-gray-500">Manage & Generate</h2>
        </div>
        <Dialog open={showNewAgreement} onOpenChange={setShowNewAgreement}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Agreement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Agreement</DialogTitle>
              <DialogDescription>
                Generate a new wrap fee agreement for your client.
              </DialogDescription>
            </DialogHeader>
            <AgreementForm 
              onSubmit={handleFormSubmit}
              onCancel={() => setShowNewAgreement(false)}
            />
          </DialogContent>
        </Dialog>

        {formData && (
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Review Agreement</DialogTitle>
                <DialogDescription>
                  Please review the agreement details before proceeding.
                </DialogDescription>
              </DialogHeader>
              <AgreementPreview 
                formData={formData}
                onClose={() => setShowPreview(false)}
                onConfirm={handleConfirm}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="space-y-4">
        {filteredAgreements.map((agreement) => (
          <Card key={agreement.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{agreement.clientName}</h3>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Created: {agreement.created}</span>
                      <span>Fee: {agreement.feeAmount}</span>
                      {agreement.isRollover && <span>Rollover</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    agreement.status === 'Signed' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agreement.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientAgreementsView;