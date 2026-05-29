import { useState } from 'react';
import { Menu, ArrowLeft, UserPlus, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import { useNavigate } from 'react-router';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '../components/ui/alert-dialog';
import { CheckCircle } from 'lucide-react';

export function AddAccount() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock account creation
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/activity');
    }, 2000);
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
              <h1 className="text-xl font-semibold">Add Account</h1>
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
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-2">
              Add New Account
            </h2>
            <p className="text-gray-600 text-center">
              Create an additional account to switch between multiple profiles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 border-gray-300"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="studentId"
                  type="text"
                  placeholder="S12345678"
                  className="pl-10 border-gray-300"
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  className="pl-10 border-gray-300"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10 border-gray-300"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10 border-gray-300"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create Account
            </Button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign in instead
            </button>
          </p>
        </div>
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <AlertDialogTitle className="text-center">
                Account Created Successfully!
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-center">
              Your new account has been created. You can now switch between accounts
              from the settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={() => {
                setShowSuccess(false);
                navigate('/activity');
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
