import React, { useState } from 'react';
import { UserCheck, Clock, AlertTriangle } from 'lucide-react';
import type { Stakeholder } from '../../types';
import { mockStakeholders } from '../../data/mockData';

interface ReportAssignmentProps {
  reportId: string;
  onAssign: (stakeholderId: string, dueDate: string) => void;
  onCancel: () => void;
}

export default function ReportAssignment({ reportId, onAssign, onCancel }: ReportAssignmentProps) {
  const [selectedStakeholder, setSelectedStakeholder] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const getStakeholdersByLevel = (level: Stakeholder['role']) => {
    return mockStakeholders.filter(s => s.role === level && s.active);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStakeholder && dueDate) {
      onAssign(selectedStakeholder, dueDate);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-center">
            <UserCheck className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-2">
            Assign Report #{reportId}
          </h3>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <div className="mt-2 flex space-x-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      priority === p
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                    {p === 'high' && <AlertTriangle className="inline ml-1 h-4 w-4" />}
                    {p === 'medium' && <Clock className="inline ml-1 h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Level 1 Stakeholders</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedStakeholder}
                onChange={(e) => setSelectedStakeholder(e.target.value)}
                required
              >
                <option value="">Select Stakeholder</option>
                {getStakeholdersByLevel('level1').map((stakeholder) => (
                  <option key={stakeholder.id} value={stakeholder.id}>
                    {stakeholder.name} - {stakeholder.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="datetime-local"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Assign Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}