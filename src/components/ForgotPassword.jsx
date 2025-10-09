import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function ForgotPassword({ navigate }) {
  const [step, setStep] = useState('email');
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendReset = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    setStep('sent');
  };

  const handleVerifyCode = () => {
    if (!resetCode) {
      alert('Please enter the verification code');
      return;
    }
    setStep('reset');
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    switch (userType) {
      case 'student':
        navigate('student-login');
        break;
      case 'teacher':
        navigate('teacher-login');
        break;
      case 'admin':
        navigate('admin-login');
        break;
    }
  };

  const getThemeColors = () => {
    switch (userType) {
      case 'student':
        return { bg: 'from-blue-50 to-indigo-100', primary: '#2563EB', hover: '#1d4ed8' };
      case 'teacher':
        return { bg: 'from-amber-50 to-orange-100', primary: '#F59E0B', hover: '#d97706' };
      case 'admin':
        return { bg: 'from-green-50 to-emerald-100', primary: '#22C55E', hover: '#16a34a' };
      default:
        return { bg: 'from-blue-50 to-indigo-100', primary: '#2563EB', hover: '#1d4ed8' };
    }
  };

  const colors = getThemeColors();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center p-8`}>
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

        {/* Card */}
        <Card className="p-8 bg-white shadow-xl border border-[#E2E8F0] rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
              {step === 'email' && 'Reset Password'}
              {step === 'sent' && 'Check Your Email'}
              {step === 'reset' && 'Create New Password'}
            </h2>
            <p className="text-[#475569] font-['Inter']">
              {step === 'email' && 'Enter your email to receive a reset link'}
              {step === 'sent' && "We've sent a verification code to your email"}
              {step === 'reset' && 'Enter your new password below'}
            </p>
          </div>

          {/* Step 1: Email Input */}
          {step === 'email' && (
            <div className="space-y-6">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">Account Type</Label>
                <Select value={userType} onValueChange={(value) => setUserType(value)}>
                  <SelectTrigger
                    className="mt-2 rounded-lg border-[#E2E8F0]"
                    style={{
                      '--tw-ring-color': colors.primary,
                      borderColor: colors.primary,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student Account</SelectItem>
                    <SelectItem value="teacher">Teacher Account</SelectItem>
                    <SelectItem value="admin">Admin Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email" className="text-[#0F172A] font-['Inter'] font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0]"
                  style={{ '--tw-ring-color': colors.primary }}
                />
              </div>

              <Button
                onClick={handleSendReset}
                className="w-full text-white rounded-lg py-3 font-['Inter'] font-medium"
                style={{ backgroundColor: colors.primary }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = colors.hover)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = colors.primary)}
              >
                Send Reset Code
              </Button>
            </div>
          )}

          {/* Step 2: Code Verification */}
          {step === 'sent' && (
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <p className="text-[#475569] font-['Inter']">
                We've sent a 6-digit verification code to:
              </p>
              <p className="font-medium text-[#0F172A] font-['Inter']">{email}</p>

              <div>
                <Label htmlFor="resetCode" className="text-[#0F172A] font-['Inter'] font-medium">
                  Verification Code
                </Label>
                <Input
                  id="resetCode"
                  placeholder="Enter 6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0] text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyCode}
                className="w-full text-white rounded-lg py-3 font-['Inter'] font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                Verify Code
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-sm text-[#475569] font-['Inter']">
                Didn’t receive the code?{' '}
                <button onClick={handleSendReset} className="hover:underline" style={{ color: colors.primary }}>
                  Resend
                </button>
              </p>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="newPassword" className="text-[#0F172A] font-['Inter'] font-medium">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0]"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-[#0F172A] font-['Inter'] font-medium">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 rounded-lg border-[#E2E8F0]"
                />
              </div>

              <div className="text-sm text-[#475569] font-['Inter'] space-y-1">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                </ul>
              </div>

              <Button
                onClick={handleResetPassword}
                className="w-full text-white rounded-lg py-3 font-['Inter'] font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                Reset Password
              </Button>
            </div>
          )}

          {/* Footer */}
          {step === 'email' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-[#475569] font-['Inter']">
                Remember your password?{' '}
                <button
                  onClick={() => {
                    switch (userType) {
                      case 'student':
                        navigate('student-login');
                        break;
                      case 'teacher':
                        navigate('teacher-login');
                        break;
                      case 'admin':
                        navigate('admin-login');
                        break;
                    }
                  }}
                  className="hover:underline"
                  style={{ color: colors.primary }}
                >
                  Back to login
                </button>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
