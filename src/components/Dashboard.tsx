import React from 'react';
import { BarChart, Users, AlertTriangle, CheckCircle, Clock, Search } from 'lucide-react';
import StatsCard from './dashboard/StatsCard';
import ReportsTable from './dashboard/ReportsTable';
import RecentActivity from './dashboard/RecentActivity';
import CardSkeleton from './skeletons/CardSkeleton';
import TableSkeleton from './skeletons/TableSkeleton';
import { useReports } from '../hooks/useReports';

export default function Dashboard() {
  const { reports, stats, loading, error } = useReports();

  if (loading) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={5} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TableSkeleton rows={5} columns={5} />
          </div>
          <TableSkeleton rows={3} columns={2} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading dashboard data. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Reports', value: stats.total.toString(), icon: BarChart, color: 'bg-blue-500' },
    { label: 'Active Cases', value: stats.active.toString(), icon: Users, color: 'bg-yellow-500' },
    { label: 'Escalated', value: stats.escalated.toString(), icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Resolved', value: stats.resolved.toString(), icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Pending Review', value: stats.pending.toString(), icon: Clock, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Monitor human rights reports and activities across all regions
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReportsTable reports={reports} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}