import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const AgreementForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    accountType: 'individual',
    feeAmount: '',
    isRollover: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={formData.clientName}
            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Client Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <select
            id="accountType"
            value={formData.accountType}
            onChange={(e) => setFormData({...formData, accountType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="individual">Individual</option>
            <option value="joint">Joint</option>
            <option value="ira">IRA</option>
            <option value="roth">Roth IRA</option>
            <option value="trust">Trust</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="feeAmount">Annual Fee Amount (%)</Label>
          <Input
            id="feeAmount"
            type="number"
            step="0.01"
            value={formData.feeAmount}
            onChange={(e) => setFormData({...formData, feeAmount: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRollover"
          checked={formData.isRollover}
          onCheckedChange={(checked) => setFormData({...formData, isRollover: checked})}
        />
        <Label htmlFor="isRollover">This is a rollover</Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Preview Agreement
        </Button>
      </div>
    </form>
  );
};

export default AgreementForm;