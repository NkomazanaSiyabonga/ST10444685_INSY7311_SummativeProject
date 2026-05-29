import { useState } from 'react';
import { ArrowLeft, Bell, Lock, User, Palette, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

export function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    mentions: true,
    replies: true,
    ratings: true,
    deadlines: true,
  });

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', action: () => {} },
        { label: 'Change Password', action: () => {} },
        { label: 'Privacy Settings', action: () => {} },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Mentions',
          toggle: true,
          value: notifications.mentions,
          onChange: (val: boolean) => setNotifications({ ...notifications, mentions: val }),
        },
        {
          label: 'Replies',
          toggle: true,
          value: notifications.replies,
          onChange: (val: boolean) => setNotifications({ ...notifications, replies: val }),
        },
        {
          label: 'Document Ratings',
          toggle: true,
          value: notifications.ratings,
          onChange: (val: boolean) => setNotifications({ ...notifications, ratings: val }),
        },
        {
          label: 'Deadline Reminders',
          toggle: true,
          value: notifications.deadlines,
          onChange: (val: boolean) => setNotifications({ ...notifications, deadlines: val }),
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [{ label: 'Theme', action: () => {} }],
    },
    {
      title: 'Security',
      icon: Lock,
      items: [
        { label: 'Two-Factor Authentication', action: () => {} },
        { label: 'Active Sessions', action: () => {} },
      ],
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', action: () => {} },
        { label: 'Report a Problem', action: () => {} },
        { label: 'Terms of Service', action: () => {} },
        { label: 'Privacy Policy', action: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-black">{section.title}</h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="px-4 py-4">
                      {item.toggle ? (
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`toggle-${section.title}-${idx}`} className="text-gray-800 cursor-pointer">
                            {item.label}
                          </Label>
                          <Switch
                            id={`toggle-${section.title}-${idx}`}
                            checked={item.value}
                            onCheckedChange={item.onChange}
                          />
                        </div>
                      ) : (
                        <button
                          onClick={item.action}
                          className="w-full text-left text-gray-800 hover:text-indigo-600 transition-colors"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Uni Connect+ v1.0.0</p>
          <p className="mt-1">© 2024 University Student Portal</p>
        </div>
      </main>
    </div>
  );
}
