import React, { useState } from 'react';
import { Clock, CheckCircle, Search, AlertTriangle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../../types';
import { mockReports } from '../../data/mockData';
import ReportAssignment from './ReportAssignment';

const statusIcons = {
  'open': Clock,
  'assigned': AlertTriangle,
  'in-progress': Clock,
  'closed': CheckCircle
};

const statusColors = {
  'open': 'bg-yellow-100 text-yellow-800',
  'assigned': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  'closed': 'bg-green-100 text-green-800'
};

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filter, setFilter] = useState('all');
  const [assigningReport, setAssigningReport] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.status === filter);

  const handleAssign = (reportId: string, stakeholderId: string, dueDate: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'assigned', assignedTo: stakeholderId }
        : report
    ));
    setAssigningReport(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Reports</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No reports found
          </div>
        ) : (
          filteredReports.map((report) => {
            const StatusIcon = statusIcons[report.status];
            const statusColor = statusColors[report.status];

            return (
              <div 
                key={report.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/reports/${report.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.location} • {new Date(report.incidentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.status === 'open' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAssigningReport(report.id);
                        }}
                        className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50"
                        title="Assign Report"
                      >
                        <UserPlus className="h-5 w-5" />
                      </button>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                      <StatusIcon className="inline-block h-4 w-4 mr-1" />
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{report.description}</p>
                {report.evidence.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {report.evidence.map((evidence) => (
                      <span key={evidence.id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        {evidence.type.charAt(0).toUpperCase() + evidence.type.slice(1)}: {evidence.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {assigningReport && (
        <ReportAssignment
          reportId={assigningReport}
          onAssign={(stakeholderId, dueDate) => handleAssign(assigningReport, stakeholderId, dueDate)}
          onCancel={() => setAssigningReport(null)}
        />
      )}
    </div>
  );
}