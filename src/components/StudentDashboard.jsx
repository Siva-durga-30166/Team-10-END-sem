import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Home, ClipboardList, BarChart3, User, Bell, LogOut, Clock, CheckCircle, Activity } from 'lucide-react';

export function StudentDashboard({ navigate, currentUser, completedForms, logout }) {
  const allForms = [
    {
      id: 1,
      title: "Course Evaluation - CS 201",
      description: "Data Structures and Algorithms feedback",
      deadline: "2025-01-30",
      estimatedTime: "5 minutes",
      type: "course-evaluation"
    },
    {
      id: 2,
      title: "Teaching Quality Assessment",
      description: "Professor Johnson - Database Systems",
      deadline: "2025-02-05",
      estimatedTime: "3 minutes",
      type: "teaching-quality"
    },
    {
      id: 3,
      title: "Campus Facilities Feedback",
      description: "Help us improve library and lab facilities",
      deadline: "2025-02-15",
      estimatedTime: "4 minutes",
      type: "campus-quality"
    }
  ];

  const mockPastForms = [
    {
      id: 10,
      title: "Course Evaluation - CS 101",
      submittedDate: "2025-01-15",
      status: "Results Available",
      type: "Course Evaluation"
    },
    {
      id: 11,
      title: "Semester Feedback - Fall 2024",
      submittedDate: "2025-01-10",
      status: "Processing",
      type: "Semester Review"
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      title: "New Feedback Form Available",
      message: "Course Evaluation for CS 301 is now available",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      title: "Results Published",
      message: "Your feedback results for CS 201 are now available",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      title: "Deadline Reminder",
      message: "Teaching Quality Assessment due in 2 days",
      time: "2 days ago",
      unread: false
    }
  ];

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const openForms = useMemo(() => {
    const completedFormIds = completedForms.map(cf => cf.id);
    return allForms.filter(form => !completedFormIds.includes(form.id));
  }, [completedForms]);

  const pastForms = useMemo(() => {
    return [...mockPastForms, ...completedForms];
  }, [completedForms]);

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const userName = currentUser?.name || 'Student';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] font-['Poppins']">
                Student Portal
              </span>
            </div>

            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-[#2563EB] font-['Inter'] font-medium">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => navigate('aggregated-results')}
                className="flex items-center space-x-2 text-[#475569] hover:text-[#2563EB] font-['Inter'] font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Results</span>
              </button>
              <button
                onClick={() => navigate('student-action-log')}
                className="flex items-center space-x-2 text-[#475569] hover:text-[#2563EB] font-['Inter'] font-medium"
              >
                <Activity className="w-4 h-4" />
                <span>Activity Log</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="font-['Poppins']">Notifications</DialogTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </DialogHeader>
          <DialogDescription className="sr-only">
            View and manage your notifications including new forms, results, and deadline reminders.
          </DialogDescription>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  notification.unread
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-[#475569] font-['Inter']">
              You have {openForms.length} open feedback forms waiting for your input.
            </p>
          </div>

          {/* Open Forms */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">
                Open Feedback Forms
              </h2>
              <Badge className="bg-[#2563EB] text-white">
                {openForms.length} Active
              </Badge>
            </div>

            {openForms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openForms.map((form) => (
                  <Card key={form.id} className="p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs text-[#475569] border-[#E2E8F0] mb-3">
                        {form.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <h3 className="font-semibold text-[#0F172A] font-['Poppins'] mb-2">
                        {form.title}
                      </h3>
                      <p className="text-sm text-[#475569] font-['Inter'] mb-4">
                        {form.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-[#475569] font-['Inter']">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Due: {form.deadline}</span>
                      </div>
                      <div className="flex items-center text-sm text-[#475569] font-['Inter']">
                        <ClipboardList className="w-4 h-4 mr-2" />
                        <span>Estimated: {form.estimatedTime}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate('feedback-form', undefined, currentUser, form.type)}
                      className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-['Inter'] font-medium"
                    >
                      Fill Form
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 bg-white border border-[#E2E8F0] rounded-2xl text-center">
                <CheckCircle className="w-16 h-16 text-[#22C55E] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-2">
                  All Caught Up!
                </h3>
                <p className="text-[#475569] font-['Inter']">
                  You've completed all available feedback forms. New forms will appear here when they become available.
                </p>
              </Card>
            )}
          </div>

          {/* Transparency Feature */}
          <div className="mb-12">
            <Card className="p-6 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] border-0 rounded-2xl text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-['Poppins'] mb-1">
                    New: Activity Transparency
                  </h3>
                  <p className="font-['Inter'] text-sm opacity-90 mb-3">
                    See what actions teachers take with your feedback data - building trust through transparency.
                  </p>
                  <Button
                    onClick={() => navigate('student-action-log')}
                    variant="secondary"
                    className="bg-white text-[#2563EB] hover:bg-gray-100 font-['Inter'] font-medium"
                  >
                    View Activity Log
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Past Forms */}
          <div>
            <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
              Past Submissions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastForms.map((form) => (
                <Card key={form.id} className="p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#0F172A] font-['Poppins'] mb-2">
                        {form.title}
                      </h3>
                      <p className="text-sm text-[#475569] font-['Inter']">
                        Submitted: {form.submittedDate}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        form.status === 'Results Available'
                          ? 'bg-[#22C55E] text-white'
                          : 'bg-[#F59E0B] text-white'
                      }`}
                    >
                      {form.status}
                    </Badge>
                  </div>

                  {form.status === 'Results Available' && (
                    <Button
                      onClick={() => navigate('aggregated-results')}
                      variant="outline"
                      className="w-full border-[#E2E8F0] text-[#2563EB] hover:bg-[#F8FAFC] rounded-lg font-['Inter'] font-medium"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
