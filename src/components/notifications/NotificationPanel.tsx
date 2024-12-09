import React from 'react';
import { X, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'escalation' | 'feedback' | 'review';
  title: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'urgent' | 'resolved';
  reportId?: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onNotificationClick: (notification: Notification) => void;
  onClearAll: () => void;
}

const statusIcons = {
  pending: Clock,
  urgent: AlertTriangle,
  resolved: CheckCircle,
};

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-800',
  urgent: 'bg-red-50 text-red-800',
  resolved: 'bg-green-50 text-green-800',
};

export default function NotificationPanel({
  notifications,
  onClose,
  onNotificationClick,
  onClearAll,
}: NotificationPanelProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
              <div className="flex items-center">
                <button
                  onClick={onClearAll}
                  className="mr-4 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 divide-y divide-gray-200 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bell className="h-12 w-12 mb-4" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const StatusIcon = statusIcons[notification.status];
                  const statusColor = statusColors[notification.status];
                  
                  return (
                    <div
                      key={notification.id}
                      onClick={() => onNotificationClick(notification)}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 ${statusColor}`}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                            {notification.reportId && (
                              <span className="text-xs text-indigo-600">
                                Report #{notification.reportId}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}