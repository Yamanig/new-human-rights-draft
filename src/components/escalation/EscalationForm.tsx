import React, { useState } from 'react';
import { AlertTriangle, ArrowUp, Clock } from 'lucide-react';

interface EscalationFormProps {
  reportId: string;
  currentLevel: 1 | 2 | 3;
  onSubmit: (data: {
    reportId: string;
    reason: string;
    targetLevel: number;
    deadline: string;
  }) => void;
  onCancel: () => void;
}

export default function EscalationForm({
  reportId,
  currentLevel,
  onSubmit,
  onCancel,
}: EscalationFormProps) {
  const [formData, setFormData] = useState({
    reason: '',
    targetLevel: Math.min(currentLevel + 1, 3),
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      reportId,
      ...formData,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Escalate Report</h2>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Clock className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Current Level: {currentLevel} • Report #{reportId}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for Escalation
          </label>
          <textarea
            required
            rows={4}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Explain why this report needs to be escalated..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Escalate to Level
          </label>
          <select
            required
            value={formData.targetLevel}
            onChange={(e) => setFormData({ ...formData, targetLevel: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {[2, 3].map((level) => (
              level > currentLevel && (
                <option key={level} value={level}>
                  Level {level} {level === 3 ? '(Highest)' : ''}
                </option>
              )
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Response Deadline
          </label>
          <input
            type="datetime-local"
            required
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Escalate Report
          </button>
        </div>
      </form>
    </div>
  );
}