import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Search, Filter, AlertTriangle, Flag, User, Calendar, ArrowRight, Tag } from 'lucide-react';

const mockEmails = [
  {
    id: 1,
    from: 'jane.cooper@example.com',
    to: ['client1@example.com'],
    subject: 'Investment Strategy Update',
    date: '2024-01-20T10:30:00',
    flagged: true,
    keywords: ['performance', 'return', 'guarantee'],
    riskScore: 'High',
    category: 'Marketing',
    preview: 'I wanted to update you on our investment strategy that has consistently outperformed...'
  },
  {
    id: 2,
    from: 'robert.fox@example.com',
    to: ['client2@example.com', 'client3@example.com'],
    subject: 'Portfolio Review Meeting',
    date: '2024-01-19T14:15:00',
    flagged: false,
    keywords: ['meeting', 'review'],
    riskScore: 'Low',
    category: 'Client Communication',
    preview: 'I would like to schedule our quarterly portfolio review meeting to discuss...'
  }
];

const EmailCard = ({ email }) => {
  const [showDetails, setShowDetails] = useState(false);

  const riskScoreColors = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {email.flagged && (
                <Flag className="w-4 h-4 text-red-500" />
              )}
              <h3 className="font-medium">{email.subject}</h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{email.from}</span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowRight className="w-4 h-4" />
                <span>{email.to.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(email.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm rounded-full ${riskScoreColors[email.riskScore]}`}>
              {email.riskScore} Risk
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
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Email Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <span className="text-sm text-gray-500">Subject</span>
                  <p className="font-medium">{email.subject}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">From</span>
                    <p>{email.from}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">To</span>
                    <p>{email.to.join(', ')}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-gray-500">Date</span>
                  <p>{new Date(email.date).toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-gray-500">Content Preview</span>
                <p className="p-4 bg-gray-50 rounded-lg">{email.preview}</p>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-gray-500">Flagged Keywords</span>
                <div className="flex flex-wrap gap-2">
                  {email.keywords.map(keyword => (
                    <span 
                      key={keyword}
                      className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => {
                    console.log('Review complete:', email.id);
                    setShowDetails(false);
                  }}
                >
                  Mark as Reviewed
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EmailMonitorView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.to.some(recipient => recipient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRisk = !riskFilter || email.riskScore === riskFilter;
    const matchesCategory = !categoryFilter || email.category === categoryFilter;
    return matchesSearch && matchesRisk && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-normal">Email Monitor</h1>
        <h2 className="text-2xl text-gray-500">Review & Compliance</h2>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search emails..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="">All Risk Levels</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Marketing">Marketing</option>
          <option value="Client Communication">Client Communication</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredEmails.map(email => (
          <EmailCard key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
};

export default EmailMonitorView;