import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import NotificationBadge from './notifications/NotificationBadge';
import NotificationPanel from './notifications/NotificationPanel';
import Sidebar from './navigation/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications] = useState([
    {
      id: '1',
      type: 'escalation',
      title: 'Report Escalated',
      message: 'Report #123 has been escalated to Level 2',
      timestamp: new Date().toISOString(),
      status: 'urgent' as const,
      reportId: '123'
    },
    {
      id: '2',
      type: 'feedback',
      title: 'New Feedback Received',
      message: 'Stakeholder provided feedback on Report #456',
      timestamp: new Date().toISOString(),
      status: 'pending' as const,
      reportId: '456'
    }
  ]);

  const handleNotificationClick = (notification: any) => {
    console.log('Clicked notification:', notification);
    setShowNotifications(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <nav className="bg-indigo-600 text-white">
          <div className="px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-white hover:bg-indigo-700 p-2 rounded-md"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center space-x-4 ml-auto">
                <NotificationBadge
                  count={notifications.length}
                  onClick={() => setShowNotifications(true)}
                />
                <User className="h-6 w-6 cursor-pointer" />
                <LogOut className="h-6 w-6 cursor-pointer" />
              </div>
            </div>
          </div>
        </nav>

        {showNotifications && (
          <NotificationPanel
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onNotificationClick={handleNotificationClick}
            onClearAll={() => console.log('Clear all notifications')}
          />
        )}

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}