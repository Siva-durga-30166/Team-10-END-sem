import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, GraduationCap, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export default function StudentSignup({ navigate, registerUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    setError('');

    // Validation
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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Register user
    const success = registerUser(formData, 'student');
    
    if (success) {
      alert('Account created successfully! You can now log in with your credentials.');
      navigate('student-login');
    } else {
      setError('An account with this email already exists. Please use a different email or try logging in.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
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
              <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-['Poppins'] mb-2">Student Registration</h2>
            <p className="text-[#475569] font-['Inter']">
              Create your account to access the feedback system
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

          {/* Signup Form */}
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-[#0F172A] font-['Inter'] font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-[#0F172A] font-['Inter'] font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email and Student ID */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-[#0F172A] font-['Inter'] font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="studentId" className="text-[#0F172A] font-['Inter'] font-medium">
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  placeholder="ST123456"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Department and Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department" className="text-[#0F172A] font-['Inter'] font-medium">
                  Department
                </Label>
                <Input
                  id="department"
                  placeholder="e.g., Computer Science, Engineering, Business"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">
                  Academic Year
                </Label>
                <Select onValueChange={(value) => handleInputChange('year', value)} disabled={isLoading}>
                  <SelectTrigger className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#2563EB]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="text-[#0F172A] font-['Inter'] font-medium">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB] pr-10"
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
                <Label htmlFor="confirmPassword" className="text-[#0F172A] font-['Inter'] font-medium">
                  Confirm Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="rounded-lg border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB] pr-10"
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
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  acceptTerms 
                    ? 'bg-[#2563EB] border-[#2563EB]' 
                    : 'border-[#E2E8F0] hover:border-[#2563EB]'
                }`}>
                  {acceptTerms && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </button>
              <p className="text-sm text-[#475569] font-['Inter']">
                I agree to the{' '}
                <a href="#" className="text-[#2563EB] hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-[#2563EB] hover:underline">Privacy Policy</a>
              </p>
            </div>

            <Button 
              onClick={handleSignup}
              disabled={!acceptTerms || isLoading}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg py-3 font-['Inter'] font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#475569] font-['Inter']">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('student-login')}
                className="text-[#2563EB] hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
