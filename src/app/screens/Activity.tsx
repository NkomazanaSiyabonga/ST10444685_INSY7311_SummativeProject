import { GraduationCap, Bell, MessageSquare, AtSign, Star, Calendar, LogOut, Menu } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';

interface ActivityItem {
  id: number;
  type: 'reply' | 'mention' | 'rating' | 'deadline';
  title: string;
  message: string;
  time: string;
  priority?: 'high' | 'normal';
}

const activityData: ActivityItem[] = [
  {
    id: 1,
    type: 'mention',
    title: 'You were mentioned',
    message: '@john mentioned you in "Group Project Discussion"',
    time: '5 min ago',
  },
  {
    id: 2,
    type: 'rating',
    title: 'Document rated',
    message: 'Your research paper "AI Ethics" received 4.5 stars',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'deadline',
    title: 'Assessment deadline approaching',
    message: 'CS301 Final Project due in 3 days',
    time: '2 hours ago',
    priority: 'high',
  },
  {
    id: 4,
    type: 'reply',
    title: 'New reply',
    message: 'Sarah replied to your question in "Database Design Forum"',
    time: '3 hours ago',
  },
  {
    id: 5,
    type: 'deadline',
    title: 'Upcoming deadline',
    message: 'MATH202 Assignment 3 due in 5 days',
    time: '5 hours ago',
  },
  {
    id: 6,
    type: 'rating',
    title: 'Document rated',
    message: 'Your presentation slides received 5 stars',
    time: '1 day ago',
  },
  {
    id: 7,
    type: 'reply',
    title: 'New reply',
    message: 'Prof. Johnson commented on your thesis draft',
    time: '1 day ago',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'mention':
      return <AtSign className="w-5 h-5" />;
    case 'rating':
      return <Star className="w-5 h-5" />;
    case 'deadline':
      return <Calendar className="w-5 h-5" />;
    case 'reply':
      return <MessageSquare className="w-5 h-5" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'mention':
      return 'bg-purple-100 text-purple-600';
    case 'rating':
      return 'bg-amber-100 text-amber-600';
    case 'deadline':
      return 'bg-red-100 text-red-600';
    case 'reply':
      return 'bg-blue-100 text-blue-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

export function Activity() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Activity</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Activity Feed */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-2">Activity Feed</h2>
          <p className="text-gray-600">
            Stay updated with your latest notifications and messages
          </p>
        </div>

        <div className="space-y-3">
          {activityData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(item.type)}`}>
                  {getActivityIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-black">
                      {item.title}
                      {item.priority === 'high' && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                          High Priority
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state hint */}
        {activityData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No new activities</h3>
            <p className="text-gray-600">Check back later for updates</p>
          </div>
        )}
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />
    </div>
  );
}