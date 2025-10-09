import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, BookOpen, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export default function TeacherSignup({ navigate, registerUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    department: '',
    title: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions.');
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = registerUser(formData, 'teacher');

    if (success) {
      alert('Account created successfully! You can now log in with your credentials.');
      navigate('teacher-login');
    } else {
      setError('An account with this email already exists. Please use a different email or try logging in.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-[#475569] hover:text-[#0F172A]"
          onClick={() => navigate('landing')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Signup Card */}
        <Card className="p-8 bg-white shadow-xl border border-[#E2E8F0] rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
              Teacher Registration
            </h2>
            <p className="text-[#475569] font-['Inter']">
              Join the feedback system as an educator
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Signup Form */}
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">First Name</Label>
                <Input
                  placeholder="Dr. Jane"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Last Name</Label>
                <Input
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email and Employee ID */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Institutional Email</Label>
                <Input
                  type="email"
                  placeholder="teacher@university.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Employee ID</Label>
                <Input
                  placeholder="EMP12345"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Department and Title */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Department</Label>
                <Input
                  placeholder="e.g., Computer Science"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Academic Title</Label>
                <Select onValueChange={(value) => handleInputChange('title', value)} disabled={isLoading}>
                  <SelectTrigger className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#F59E0B]">
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="associate-professor">Associate Professor</SelectItem>
                    <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                    <SelectItem value="lecturer">Lecturer</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="adjunct">Adjunct Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Password</Label>
                <div className="relative mt-2">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Confirm Password</Label>
                <div className="relative mt-2">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="rounded-lg border-[#E2E8F0] focus:border-[#F59E0B] focus:ring-[#F59E0B] pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className="mt-1"
                disabled={isLoading}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    acceptTerms
                      ? 'bg-[#F59E0B] border-[#F59E0B]'
                      : 'border-[#E2E8F0] hover:border-[#F59E0B]'
                  }`}
                >
                  {acceptTerms && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </button>
              <p className="text-sm text-[#475569] font-['Inter']">
                I agree to the{' '}
                <a href="#" className="text-[#F59E0B] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#F59E0B] hover:underline">
                  Privacy Policy
                </a>
                . Account requires institutional verification.
              </p>
            </div>

            <Button
              onClick={handleSignup}
              disabled={!acceptTerms || isLoading}
              className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-white rounded-lg py-3 font-['Inter'] font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Submit Registration'
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#475569] font-['Inter']">
              Already have an account?{' '}
              <button onClick={() => navigate('teacher-login')} className="text-[#F59E0B] hover:underline">
                Sign in here
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
