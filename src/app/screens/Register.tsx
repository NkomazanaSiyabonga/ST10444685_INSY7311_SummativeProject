import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, IdCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - in real app, this would create account
    navigate('/activity');
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-black">Uni Connect+</h1>
          <p className="text-gray-600 mt-2">Create your student account</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="pl-10 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="studentId"
                  type="text"
                  placeholder="S12345678"
                  value={formData.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  className="pl-10 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10 border-gray-300"
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-10 pr-10 border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10 border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300" required />
              <span className="text-gray-700">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => navigate('/signin')}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}