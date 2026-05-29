import { useState } from 'react';
import { LogOut, Settings, User, Circle, Bell, UserPlus, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserStatus = 'available' | 'busy' | 'away';

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<UserStatus>('available');
  const username = 'John Doe'; // Mock username

  const handleLogout = () => {
    navigate('/signin');
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'busy':
        return 'text-red-500';
      case 'away':
        return 'text-yellow-500';
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col">
        {/* User Profile Section */}
        <div className="bg-black text-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{username}</h3>
              <p className="text-xs text-gray-400">Student ID: S12345678</p>
            </div>
          </div>

          {/* Status Selector */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Status</label>
            <Select value={userStatus} onValueChange={(value) => setUserStatus(value as UserStatus)}>
              <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                <div className="flex items-center gap-2">
                  <Circle className={`w-3 h-3 fill-current ${getStatusColor(userStatus)}`} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">
                  <div className="flex items-center gap-2">
                    <Circle className="w-3 h-3 fill-current text-green-500" />
                    <span>Available</span>
                  </div>
                </SelectItem>
                <SelectItem value="busy">
                  <div className="flex items-center gap-2">
                    <Circle className="w-3 h-3 fill-current text-red-500" />
                    <span>Busy</span>
                  </div>
                </SelectItem>
                <SelectItem value="away">
                  <div className="flex items-center gap-2">
                    <Circle className="w-3 h-3 fill-current text-yellow-500" />
                    <span>Away</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                navigate('/notifications');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-800">Notifications</span>
              <span className="ml-auto bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                3
              </span>
            </button>

            <button
              onClick={() => {
                navigate('/add-account');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <UserPlus className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-800">Add Account</span>
            </button>

            <button
              onClick={() => {
                navigate('/faqs');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <HelpCircle className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-800">FAQs</span>
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={() => {
                navigate('/settings');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <Settings className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-800">Settings</span>
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
