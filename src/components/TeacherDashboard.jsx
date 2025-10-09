import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  Home,
  Plus,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  QrCode,
  Edit,
  Eye,
  Share,
  LogOut,
  Activity,
} from 'lucide-react';
import { ActionLogger, ActionTypes, createActionLogEntry } from '../utils/actionLogger';

// ---------------- Mock Data ----------------
const mockForms = [
  {
    id: 1,
    title: 'Course Evaluation - CS 201',
    status: 'Active',
    responses: 45,
    created: '2025-01-15',
    deadline: '2025-01-30',
  },
  {
    id: 2,
    title: 'Mid-term Feedback',
    status: 'Draft',
    responses: 0,
    created: '2025-01-20',
    deadline: '2025-02-05',
  },
  {
    id: 3,
    title: 'Teaching Quality Assessment',
    status: 'Closed',
    responses: 78,
    created: '2025-01-01',
    deadline: '2025-01-15',
  },
];

// ---------------- Component ----------------
export function TeacherDashboard({ navigate, currentUser, logout }) {
  const teacherName = currentUser?.name || 'Professor';

  // Log dashboard access
  useEffect(() => {
    if (currentUser) {
      ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          ActionTypes.DASHBOARD_ACCESSED,
          'Accessed teacher dashboard',
          'dashboard',
          'teacher-dashboard'
        )
      );
    }
  }, [currentUser]);

  const handleFormAction = async (action, formId, formTitle) => {
    if (!currentUser) return;

    let actionType = '';
    let details = '';

    switch (action) {
      case 'edit':
        actionType = ActionTypes.FORM_EDITED;
        details = `Opened form "${formTitle}" for editing`;
        navigate('form-builder');
        break;
      case 'view':
        actionType = ActionTypes.RESPONSES_VIEWED;
        details = `Viewed responses for form "${formTitle}"`;
        navigate('analytics');
        break;
      case 'share':
        actionType = ActionTypes.FORM_SHARED;
        details = `Generated sharing link for form "${formTitle}"`;
        break;
      case 'qr':
        actionType = ActionTypes.FORM_SHARED;
        details = `Generated QR code for form "${formTitle}"`;
        break;
      default:
        break;
    }

    if (actionType) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          actionType,
          details,
          'form',
          formId.toString(),
          { formTitle, action }
        )
      );
    }
  };

  const handleNewForm = async () => {
    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          ActionTypes.FORM_CREATED,
          'Started creating a new feedback form',
          'form',
          'new',
          { source: 'dashboard' }
        )
      );
    }
    navigate('form-builder');
  };

  const handleAnalyticsAccess = async () => {
    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          ActionTypes.ANALYTICS_VIEWED,
          'Accessed analytics dashboard',
          'analytics',
          'main-dashboard'
        )
      );
    }
    navigate('analytics');
  };

  const handleWeHeardYouAccess = async () => {
    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          ActionTypes.FEEDBACK_ACTION_CREATED,
          'Accessed We Heard You action tracking',
          'feedback-actions',
          'we-heard-you'
        )
      );
    }
    navigate('we-heard-you');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#F59E0B] rounded-lg flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] font-['Poppins']">
                Teacher Portal
              </span>
            </div>

            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-[#F59E0B] font-['Inter'] font-medium">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={handleAnalyticsAccess}
                className="flex items-center space-x-2 text-[#475569] hover:text-[#F59E0B] font-['Inter'] font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button
                onClick={handleWeHeardYouAccess}
                className="flex items-center space-x-2 text-[#475569] hover:text-[#F59E0B] font-['Inter'] font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>We Heard You</span>
              </button>
              <button
                onClick={() => navigate('action-log')}
                className="flex items-center space-x-2 text-[#475569] hover:text-[#F59E0B] font-['Inter'] font-medium"
              >
                <Activity className="w-4 h-4" />
                <span>Action Log</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={handleNewForm} className="bg-[#F59E0B] hover:bg-[#d97706] text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Form
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            {logout && (
              <Button variant="ghost" size="sm" onClick={logout} title="Logout">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
              Welcome back, {teacherName}!
            </h1>
            <p className="text-[#475569] font-['Inter']">
              Monitor your feedback forms and analyze student responses.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] mb-1">Total Responses</p>
                  <p className="text-3xl font-bold text-[#0F172A]">123</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
              <p className="text-sm text-[#22C55E] mt-2">↗ +18% from last week</p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] mb-1">Active Forms</p>
                  <p className="text-3xl font-bold text-[#0F172A]">3</p>
                </div>
                <div className="w-12 h-12 bg-[#F59E0B] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
              <p className="text-sm text-[#475569] mt-2">2 awaiting responses</p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] mb-1">Response Rate</p>
                  <p className="text-3xl font-bold text-[#0F172A]">87%</p>
                </div>
                <div className="w-12 h-12 bg-[#22C55E] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#22C55E]" />
                </div>
              </div>
              <p className="text-sm text-[#22C55E] mt-2">Above average</p>
            </Card>
          </div>

          {/* Forms Table */}
          <Card className="bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#0F172A]">Feedback Forms</h2>
              <Button onClick={handleNewForm} className="bg-[#F59E0B] hover:bg-[#d97706] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Form
              </Button>
            </div>

            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.title}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            form.status === 'Active'
                              ? 'bg-[#22C55E] text-white'
                              : form.status === 'Draft'
                              ? 'bg-[#F59E0B] text-white'
                              : 'bg-[#475569] text-white'
                          }`}
                        >
                          {form.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{form.responses}</TableCell>
                      <TableCell>{form.created}</TableCell>
                      <TableCell>{form.deadline}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFormAction('edit', form.id, form.title)}
                            title="Edit Form"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFormAction('view', form.id, form.title)}
                            title="View Responses"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFormAction('qr', form.id, form.title)}
                            title="Generate QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFormAction('share', form.id, form.title)}
                            title="Share Form"
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
