"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Eye, Download, Filter } from 'lucide-react';

interface Agreement {
  id: number;
  clientName: string;
  type: string;
  status: string;
  created: string;
  amount: string;
  feeStructure: string;
  documents: string[];
}

const mockAgreements: Agreement[] = [
  {
    id: 1,
    clientName: "John Smith",
    type: "Wrap Fee Agreement",
    status: "Pending Review",
    created: "2024-01-20",
    amount: "$500,000",
    feeStructure: "1.25% Annual",
    documents: ["Fee Agreement", "Investment Policy"]
  },
  {
    id: 2,
    clientName: "Sarah Johnson",
    type: "Investment Advisory",
    status: "Active",
    created: "2024-01-15",
    amount: "$750,000",
    feeStructure: "1% Annual",
    documents: ["Advisory Agreement", "Risk Disclosure"]
  }
];

export function AgreementsView() {
  const [agreements] = useState<Agreement[]>(mockAgreements);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredAgreements = selectedStatus === 'all'
    ? agreements
    : agreements.filter(a => a.status.toLowerCase() === selectedStatus.toLowerCase());

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Client Agreements</h1>
          <p className="text-gray-500">Manage and track client agreements</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Agreement
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border-0 bg-transparent focus:ring-0 text-sm"
        >
          <option value="all">All Agreements</option>
          <option value="active">Active</option>
          <option value="pending review">Pending Review</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Agreements List */}
      <div className="space-y-4">
        {filteredAgreements.map((agreement) => (
          <Card key={agreement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{agreement.clientName}</h3>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{agreement.type}</span>
                      <span>•</span>
                      <span>{agreement.amount}</span>
                      <span>•</span>
                      <span>{agreement.feeStructure}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    agreement.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agreement.status}
                  </span>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                  {agreement.documents.map((doc, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}