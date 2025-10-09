import { Button } from './ui/button';
import { GraduationCap, Users, Shield } from 'lucide-react';

export default function Landing({ navigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-8">
      {/* Logo and Title */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center mr-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#0F172A] font-['Poppins']">
              Student Feedback
            </h1>
            <h1 className="text-4xl font-bold text-[#2563EB] font-['Poppins']">
              & Evaluation System
            </h1>
          </div>
        </div>
        <p className="text-lg text-[#475569] max-w-2xl mx-auto font-['Inter']">
          Empowering educational institutions with comprehensive feedback collection,
          analysis, and actionable insights for continuous improvement.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Student Card */}
        <div
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group border border-[#E2E8F0]"
          onClick={() => navigate('student-login', 'student')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2563EB] transition-colors">
              <GraduationCap className="w-8 h-8 text-[#2563EB] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4 font-['Poppins']">Student</h3>
            <p className="text-[#475569] mb-6 font-['Inter']">
              Share your feedback and help improve your learning experience
            </p>
            <Button className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg py-3">
              Login as Student
            </Button>
          </div>
        </div>

        {/* Teacher Card */}
        <div
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group border border-[#E2E8F0]"
          onClick={() => navigate('teacher-login', 'teacher')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FEF3C7] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F59E0B] transition-colors">
              <Users className="w-8 h-8 text-[#F59E0B] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4 font-['Poppins']">Teacher</h3>
            <p className="text-[#475569] mb-6 font-['Inter']">
              Create forms, analyze feedback, and track student responses
            </p>
            <Button className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-white rounded-lg py-3">
              Login as Teacher
            </Button>
          </div>
        </div>

        {/* Admin Card */}
        <div
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group border border-[#E2E8F0]"
          onClick={() => navigate('admin-login', 'admin')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#DCFCE7] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#22C55E] transition-colors">
              <Shield className="w-8 h-8 text-[#22C55E] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4 font-['Poppins']">Administrator</h3>
            <p className="text-[#475569] mb-6 font-['Inter']">
              Manage institution-wide settings and monitor overall performance
            </p>
            <Button className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-lg py-3">
              Login as Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm text-[#475569] font-['Inter']">
          Designed for educational excellence • Secure & Anonymous • Easy to use
        </p>
      </div>
    </div>
  );
}
