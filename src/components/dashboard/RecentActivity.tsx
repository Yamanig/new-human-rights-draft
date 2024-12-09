import React from 'react';
import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'report_update',
    description: 'Report #123 status updated to "In Progress"',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'stakeholder_assignment',
    description: 'John Doe assigned to Report #456',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '3',
    type: 'evidence_upload',
    description: 'New evidence uploaded for Report #789',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{activity.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(activity.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}