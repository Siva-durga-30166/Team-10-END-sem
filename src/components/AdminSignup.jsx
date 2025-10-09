import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Shield, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminSignup({ navigate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    department: '',
    position: '',
    justification: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    if (!formData.justification.trim()) {
      alert('Please provide justification for admin access');
      return;
    }

    navigate('admin-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-8">
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
              <div className="w-12 h-12 bg-[#22C55E] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
              Admin Access Request
            </h2>
            <p className="text-[#475569] font-['Inter']">
              Request institutional administrative privileges
            </p>

            {/* Warning Notice */}
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-amber-800 font-['Inter'] font-medium">
                  Admin Access Requires Approval
                </p>
                <p className="text-xs text-amber-700 font-['Inter'] mt-1">
                  All admin requests are reviewed by existing administrators. You will be notified via
                  email once your request is processed.
                </p>
              </div>
            </div>
          </div>

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
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E]"
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
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E]"
                />
              </div>
            </div>

            {/* Email and Employee ID */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-[#0F172A] font-['Inter'] font-medium">
                  Institutional Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@university.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E]"
                />
              </div>
              <div>
                <Label htmlFor="employeeId" className="text-[#0F172A] font-['Inter'] font-medium">
                  Employee ID
                </Label>
                <Input
                  id="employeeId"
                  placeholder="EMP12345"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E]"
                />
              </div>
            </div>

            {/* Department and Position */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Department</Label>
                <Select onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it-services">IT Services</SelectItem>
                    <SelectItem value="academic-affairs">Academic Affairs</SelectItem>
                    <SelectItem value="student-services">Student Services</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="registrar">Registrar</SelectItem>
                    <SelectItem value="provost">Provost Office</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Position/Role</Label>
                <Select onValueChange={(value) => handleInputChange('position', value)}>
                  <SelectTrigger className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E]">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Justification */}
            <div>
              <Label htmlFor="justification" className="text-[#0F172A] font-['Inter'] font-medium">
                Justification for Admin Access
              </Label>
              <Textarea
                id="justification"
                placeholder="Please explain why you need administrative access to the feedback system. Include your role responsibilities and how this access will benefit the institution."
                value={formData.justification}
                onChange={(e) => handleInputChange('justification', e.target.value)}
                className="mt-2 rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E] min-h-[100px]"
              />
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
                    className="rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
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
                    className="rounded-lg border-[#E2E8F0] focus:border-[#22C55E] focus:ring-[#22C55E] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
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
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    acceptTerms
                      ? 'bg-[#22C55E] border-[#22C55E]'
                      : 'border-[#E2E8F0] hover:border-[#22C55E]'
                  }`}
                >
                  {acceptTerms && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </button>
              <p className="text-sm text-[#475569] font-['Inter']">
                I agree to the{' '}
                <a href="#" className="text-[#22C55E] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#22C55E] hover:underline">
                  Privacy Policy
                </a>
                . I understand that admin access requires approval and is subject to audit.
              </p>
            </div>

            <Button
              onClick={handleSignup}
              disabled={!acceptTerms}
              className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-lg py-3 font-['Inter'] font-medium disabled:opacity-50"
            >
              Submit Access Request
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#475569] font-['Inter']">
              Already have admin access?{' '}
              <button
                onClick={() => navigate('admin-login')}
                className="text-[#22C55E] hover:underline"
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
