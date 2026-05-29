import { useState } from 'react';
import { Menu, Bell, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import { useNavigate } from 'react-router';

interface Notification {
  id: string;
  type: 'mention' | 'rating' | 'reply' | 'deadline';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'mention',
    title: '@mention from Sarah Chen',
    message: 'Sarah mentioned you in Computer Science community',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'rating',
    title: 'Document Rated',
    message: 'Your "Algorithm Notes - Week 5.pdf" received a 5-star rating',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'deadline',
    title: 'Assessment Deadline',
    message: 'Database Systems Assignment due in 2 days',
    time: '3 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'reply',
    title: 'New Reply',
    message: 'Mike Johnson replied to your comment',
    time: '5 hours ago',
    read: true,
  },
];

export function Notifications() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'mention':
        return '👤';
      case 'rating':
        return '⭐';
      case 'reply':
        return '💬';
      case 'deadline':
        return '📅';
      default:
        return '🔔';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/activity')}
                className="text-white hover:text-gray-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">Notifications</h1>
            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-black">All Notifications</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setNotifications(notifications.map((n) => ({ ...n, read: true })))
            }
            className="border-gray-300"
          >
            Mark all as read
          </Button>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No notifications
              </h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-indigo-600' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-black mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-600 flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />
    </div>
  );
}
