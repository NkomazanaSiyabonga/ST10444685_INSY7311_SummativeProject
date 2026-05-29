import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap } from 'lucide-react';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6 animate-fadeIn">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl">
            <GraduationCap className="w-14 h-14 text-black" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-white">Uni Connect+</h1>
          <p className="text-gray-400">Your Student Portal</p>
        </div>
        <div className="flex justify-center pt-4">
          <div className="w-16 h-1 bg-indigo-600 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}