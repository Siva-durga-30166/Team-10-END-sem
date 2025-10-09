import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function TeacherLogin({ navigate, authenticateUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = authenticateUser(email, password, 'teacher');

    if (user) {
      navigate('teacher-dashboard', 'teacher', user);
    } else {
      setError('Account not found. Please check your credentials or contact administration for access.');
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-[#475569] hover:text-[#0F172A]"
          onClick={() => navigate('landing')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="p-8 bg-white shadow-xl border border-[#E2E8F0] rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-['Poppins'] mb-2">Teacher Login</h2>
            <p className="text-[#475569] font-['Inter']">
              Access your teaching dashboard and analytics
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#0F172A] font-['Inter'] font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#0F172A] font-['Inter'] font-medium">
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B] pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-white rounded-lg py-3 font-['Inter'] font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Login to Dashboard'
              )}
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-[#475569] font-['Inter']">
              <button
                onClick={() => navigate('forgot-password')}
                className="text-[#F59E0B] hover:underline"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </p>
            <p className="text-sm text-[#475569] font-['Inter']">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('teacher-signup')}
                className="text-[#F59E0B] hover:underline"
                disabled={isLoading}
              >
                Sign up here
              </button>
            </p>
            <p className="text-xs text-[#475569] font-['Inter']">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
