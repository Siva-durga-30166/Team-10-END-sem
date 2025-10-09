import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ArrowLeft,
  Activity,
  Search,
  User,
  FileText,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";
import { ActionLogger } from "../utils/actionLogger";
// If you don't use these, you can delete the next line.
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function StudentActionLog({ navigate, currentUser }) {
  const [actions, setActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      loadStudentActions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  useEffect(() => {
    // Filter and search actions
    let filtered = actions;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (action) =>
          action.action?.toLowerCase().includes(q) ||
          action.details?.toLowerCase().includes(q) ||
          action.targetType?.toLowerCase().includes(q)
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((action) => {
        const a = action.action?.toLowerCase() || "";
        switch (filterType) {
          case "forms":
            return a.includes("form");
          case "responses":
            return a.includes("response");
          case "analytics":
            return a.includes("analytics") || a.includes("report");
          case "feedback":
            return a.includes("feedback");
          default:
            return true;
        }
      });
    }

    setFilteredActions(filtered);
  }, [actions, searchTerm, filterType]);

  const loadStudentActions = async () => {
    if (!currentUser?.id) return;

    try {
      setIsLoading(true);
      // Try to get real actions from the backend
      const studentActions = await ActionLogger.getStudentRelatedActions(
        currentUser.id
      );

      if (studentActions && studentActions.length > 0) {
        setActions(studentActions);
      } else {
        // Fallback to mock data for demonstration
        setActions(generateMockStudentActions());
      }
    } catch (error) {
      console.error("Failed to load student actions:", error);
     
      setActions(generateMockStudentActions());
    } finally {
      setIsLoading(false);
    }
  };

 
  const generateMockStudentActions = () => {
    const now = new Date();

    return [
      {
        id: "1",
        teacherId: "teacher1",
        teacherName: "Dr. Johnson",
        action: "Student Response Viewed",
        details: `Reviewed feedback submission for Course Evaluation - CS 201`,
        targetType: "Student Response",
        targetId: currentUser?.id,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: "2",
        teacherId: "teacher1",
        teacherName: "Dr. Johnson",
        action: "Feedback Action Created",
        details: `Created action item: "Improve course pacing" based on your feedback`,
        targetType: "Feedback Action",
        targetId: currentUser?.id,
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      },
      {
        id: "3",
        teacherId: "teacher2",
        teacherName: "Prof. Smith",
        action: "Individual Response Viewed",
        details: `Detailed review of your Teaching Quality Assessment submission`,
        targetType: "Student Response",
        targetId: currentUser?.id,
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        id: "4",
        teacherId: "teacher1",
        teacherName: "Dr. Johnson",
        action: "Response Flagged for Review",
        details:
          "Your response was marked for detailed analysis - positive feedback noted",
        targetType: "Student Response",
        targetId: currentUser?.id,
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      },
      {
        id: "5",
        teacherId: "teacher3",
        teacherName: "Dr. Mary Wilson",
        action: "Analytics Filter Applied",
        details:
          "Applied filter to view responses from students in your cohort",
        targetType: "Analytics",
        targetId: currentUser?.id,
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      },
      {
        id: "6",
        teacherId: "teacher1",
        teacherName: "Dr. Johnson",
        action: "Feedback Action Completed",
        details:
          'Completed action: "Update lecture slides with examples" - from your suggestion',
        targetType: "Feedback Action",
        targetId: currentUser?.id,
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      },
    ];
  };

  const getActionIcon = (action) => {
    const a = (action || "").toLowerCase();
    if (a.includes("form")) return <FileText className="w-4 h-4" />;
    if (a.includes("response")) return <MessageSquare className="w-4 h-4" />;
    if (a.includes("analytics") || a.includes("report"))
      return <BarChart3 className="w-4 h-4" />;
    if (a.includes("feedback")) return <MessageSquare className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getActionColor = (action) => {
    const a = (action || "").toLowerCase();
    if (a.includes("created") || a.includes("completed"))
      return "bg-[#22C55E] text-white";
    if (a.includes("viewed") || a.includes("accessed"))
      return "bg-[#2563EB] text-white";
    if (a.includes("flagged")) return "bg-[#F59E0B] text-white";
    if (a.includes("filter")) return "bg-[#8B5CF6] text-white";
    return "bg-[#475569] text-white";
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-[#475569] hover:text-[#0F172A]"
            onClick={() => navigate("student-dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
                My Activity Log
              </h1>
              <p className="text-[#475569] font-['Inter']">
                See what actions teachers have taken related to your feedback
                and data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-[#475569] font-['Inter'] bg-[#F8FAFC] px-3 py-2 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Transparency & Privacy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Summary Card */}
          <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A] font-['Poppins'] mb-2">
                  Why can I see this?
                </h3>
                <p className="text-[#475569] font-['Inter'] text-sm leading-relaxed">
                  As part of our commitment to transparency, you can see all
                  actions teachers take that involve your data or feedback. This
                  includes when they view your responses, create action items
                  based on your suggestions, or analyze your feedback data.
                </p>
              </div>
              <div className="w-16 h-16 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-[#2563EB]" />
              </div>
            </div>
          </Card>

          {/* Filters and Search */}
          <Card className="bg-white border border-[#E2E8F0] rounded-2xl mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475569] w-4 h-4" />
                    <Input
                      placeholder="Search actions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="forms">Form Related</SelectItem>
                      <SelectItem value="responses">My Responses</SelectItem>
                      <SelectItem value="analytics">Data Analysis</SelectItem>
                      <SelectItem value="feedback">Feedback Actions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-[#475569] font-['Inter']">
                  Showing {filteredActions.length} of {actions.length} actions
                </div>
              </div>
            </div>
          </Card>

          {/* Action List */}
          <Card className="bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">
                Activity Timeline
              </h2>
              <p className="text-[#475569] font-['Inter'] mt-1">
                Recent actions taken by teachers related to your feedback and
                data
              </p>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-[#475569] font-['Inter']">
                    Loading activity log...
                  </div>
                </div>
              ) : filteredActions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Activity className="w-12 h-12 text-[#E2E8F0] mb-4" />
                  <p className="text-[#475569] font-['Inter'] text-center">
                    {searchTerm || filterType !== "all"
                      ? "No actions match your filters"
                      : "No actions recorded yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActions.map((action, index) => (
                    <div
                      key={action.id || index}
                      className="flex items-start space-x-4 p-4 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                    >
                      {/* Action Icon */}
                      <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center flex-shrink-0">
                        {getActionIcon(action.action)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 mr-4">
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="font-medium text-[#0F172A] font-['Inter']">
                                {action.action}
                              </h4>
                              <Badge className={getActionColor(action.action)}>
                                {action.targetType || "General"}
                              </Badge>
                            </div>

                            {action.details && (
                              <p className="text-[#475569] font-['Inter'] text-sm mb-2">
                                {action.details}
                              </p>
                            )}

                            <div className="flex items-center space-x-4 text-xs text-[#475569] font-['Inter']">
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {action.teacherName}
                              </span>
                              {action.targetId && (
                                <span>Relates to your data</span>
                              )}
                            </div>
                          </div>

                          <div className="text-sm text-[#475569] font-['Inter'] text-right flex-shrink-0">
                            {action.timestamp && formatTimestamp(action.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
