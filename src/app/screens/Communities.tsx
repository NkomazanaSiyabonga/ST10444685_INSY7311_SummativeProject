import { useState } from 'react';
import { Menu, Plus, ChevronRight, Users, Search, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface Community {
  id: string;
  name: string;
  course?: string;
  year?: string;
  memberCount: number;
  isGeneral?: boolean;
  isCustom?: boolean;
  createdBy?: string;
}

interface User {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'away';
  course: string;
}

const courses = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Medicine',
  'Law',
  'Mathematics',
  'Physics',
  'Psychology',
];

const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];

const subjectGroups: Record<string, string[]> = {
  'Computer Science': [
    'Algorithms & Data Structures',
    'Database Systems',
    'Web Development',
    'AI & Machine Learning',
    'Cybersecurity',
  ],
  'Engineering': [
    'Thermodynamics',
    'Circuit Design',
    'Mechanics',
    'Materials Science',
    'Control Systems',
  ],
  'Business Administration': [
    'Marketing Strategy',
    'Financial Management',
    'Operations Management',
    'Organizational Behavior',
    'Business Analytics',
  ],
  'Medicine': [
    'Anatomy',
    'Pharmacology',
    'Clinical Medicine',
    'Pathology',
    'Surgery',
  ],
};

const mockUsers: User[] = [
  { id: '1', name: 'Sarah Chen', status: 'available', course: 'Computer Science' },
  { id: '2', name: 'Mike Johnson', status: 'busy', course: 'Engineering' },
  { id: '3', name: 'Emily Davis', status: 'available', course: 'Computer Science' },
  { id: '4', name: 'Alex Thompson', status: 'away', course: 'Business Administration' },
];

export function Communities() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const [showJoinCourseDialog, setShowJoinCourseDialog] = useState(false);
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleGroupSelection = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const toggleMemberSelection = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleJoinCommunities = () => {
    if (!selectedCourse || !selectedYear) return;

    const newCommunities: Community[] = [
      {
        id: `general-${selectedCourse}`,
        name: selectedCourse,
        course: selectedCourse,
        memberCount: Math.floor(Math.random() * 500) + 100,
        isGeneral: true,
      },
      ...selectedGroups.map((group, idx) => ({
        id: `${selectedCourse}-${group}-${idx}`,
        name: group,
        course: selectedCourse,
        year: selectedYear,
        memberCount: Math.floor(Math.random() * 100) + 20,
      })),
    ];

    setJoinedCommunities((prev) => [...prev, ...newCommunities]);
    setShowJoinCourseDialog(false);
    setSelectedCourse('');
    setSelectedYear('');
    setSelectedGroups([]);
  };

  const handleCreateGroup = () => {
    if (!groupName || selectedMembers.length === 0) return;

    const newGroup: Community = {
      id: `custom-${Date.now()}`,
      name: groupName,
      memberCount: selectedMembers.length + 1,
      isCustom: true,
      createdBy: 'You',
    };

    setJoinedCommunities((prev) => [...prev, newGroup]);
    setShowCreateGroupDialog(false);
    setGroupName('');
    setSelectedMembers([]);
  };

  const handleCommunityClick = (community: Community) => {
    navigate(`/chat/${community.id}`, { state: { community } });
  };

  const handleUserClick = (user: User) => {
    const dmCommunity: Community = {
      id: `dm-${user.id}`,
      name: user.name,
      memberCount: 2,
      isCustom: true,
    };
    navigate(`/chat/${dmCommunity.id}`, { state: { community: dmCommunity } });
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableGroups = selectedCourse ? subjectGroups[selectedCourse] || [] : [];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold flex-1">Chats</h1>
            <div className="flex gap-2">
              <Dialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-gray-900"
                  >
                    <UserPlus className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Create Custom Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g., CS301 Group Project"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Add Members</Label>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {mockUsers.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => toggleMemberSelection(user.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              selectedMembers.includes(user.id)
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-black">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.course}</p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  selectedMembers.includes(user.id)
                                    ? 'border-indigo-600 bg-indigo-600'
                                    : 'border-gray-300'
                                }`}
                              >
                                {selectedMembers.includes(user.id) && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateGroupDialog(false)}
                        className="flex-1 border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateGroup}
                        disabled={!groupName || selectedMembers.length === 0}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                      >
                        Create Group
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowJoinCourseDialog(true)}
                className="text-gray-300 hover:text-white hover:bg-gray-900"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowUserSearch(e.target.value.length > 0);
              }}
              onFocus={() => setShowUserSearch(searchQuery.length > 0)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* User Search Results */}
          {showUserSearch && (
            <div className="absolute left-4 right-4 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-40">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      handleUserClick(user);
                      setShowUserSearch(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-black">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.course}</p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          user.status === 'available'
                            ? 'bg-green-500'
                            : user.status === 'busy'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No users found</div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {joinedCommunities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-3">No Chats Yet</h2>
            <p className="text-gray-600 mb-8">
              Join course communities or create custom groups to start chatting
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Button
                onClick={() => setShowJoinCourseDialog(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Join Course Communities
              </Button>
              <Button
                onClick={() => setShowCreateGroupDialog(true)}
                variant="outline"
                className="border-gray-300"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create Custom Group
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-black mb-2">Your Chats</h2>
              <p className="text-gray-600">
                {joinedCommunities.length}{' '}
                {joinedCommunities.length === 1 ? 'conversation' : 'conversations'}
              </p>
            </div>

            <div className="space-y-3">
              {joinedCommunities.map((community) => (
                <button
                  key={community.id}
                  onClick={() => handleCommunityClick(community)}
                  className="w-full bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        community.isGeneral
                          ? 'bg-indigo-600'
                          : community.isCustom
                          ? 'bg-green-600'
                          : 'bg-gray-900'
                      }`}
                    >
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-black">{community.name}</h3>
                        {community.isGeneral && (
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                            General
                          </span>
                        )}
                        {community.isCustom && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Custom
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {community.memberCount} members
                        {community.year && ` · ${community.year}`}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Join Course Communities Dialog */}
      <Dialog open={showJoinCourseDialog} onOpenChange={setShowJoinCourseDialog}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Join Course Communities</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Select your course
              </label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourse && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Select your year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full border-gray-300">
                    <SelectValue placeholder="Choose your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedCourse && selectedYear && (
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-black mb-2">General Group</h3>
                  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-black">{selectedCourse}</p>
                          <p className="text-xs text-gray-500">General course community</p>
                        </div>
                      </div>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        Auto-joined
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black mb-2">
                    Select subject groups (optional)
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableGroups.map((group) => (
                      <button
                        key={group}
                        onClick={() => toggleGroupSelection(group)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedGroups.includes(group)
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-black">{group}</span>
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedGroups.includes(group)
                                ? 'border-indigo-600 bg-indigo-600'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedGroups.includes(group) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowJoinCourseDialog(false)}
                    className="flex-1 border-gray-300 text-black hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleJoinCommunities}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Join Communities
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />
    </div>
  );
}
