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
  Calendar,
  Filter,
  Download,
  Search,
  Clock,
  User,
  FileText,
  BarChart3,
  MessageSquare,
} from "lucide-react";


import { ActionLogger } from "../utils/actionLogger";

export function ActionLog({ navigate, currentUser }) {
  const [actions, setActions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filteredActions, setFilteredActions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      loadActionData();
    }
    
  }, [currentUser?.id]);

  useEffect(() => {
   
    let filtered = actions;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.action?.toLowerCase().includes(q) ||
          a.details?.toLowerCase().includes(q) ||
          a.targetType?.toLowerCase().includes(q)
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((a) => {
        const txt = a.action?.toLowerCase() || "";
        switch (filterType) {
          case "forms":
            return txt.includes("form");
          case "responses":
            return txt.includes("response");
          case "analytics":
            return txt.includes("analytics") || txt.includes("report");
          case "feedback":
            return txt.includes("feedback");
          default:
            return true;
        }
      });
    }

    setFilteredActions(filtered);
  }, [actions, searchTerm, filterType]);

  const loadActionData = async () => {
    if (!currentUser?.id) return;
    try {
      setIsLoading(true);

      
      const [actionsData, summaryData] = await Promise.all([
        ActionLogger.getActionLog(currentUser.id),
        ActionLogger.getActionLogSummary(currentUser.id),
      ]);

      setActions(Array.isArray(actionsData) ? actionsData : []);
      setSummary(summaryData || null);
    } catch (err) {
      console.error("Failed to load action data:", err);
      
      setActions([]);
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action) => {
    const s = (action || "").toLowerCase();
    if (s.includes("form")) return <FileText className="w-4 h-4" />;
    if (s.includes("response")) return <MessageSquare className="w-4 h-4" />;
    if (s.includes("analytics") || s.includes("report"))
      return <BarChart3 className="w-4 h-4" />;
    if (s.includes("feedback")) return <MessageSquare className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getActionColor = (action) => {
    const s = (action || "").toLowerCase();
    if (s.includes("created") || s.includes("published"))
      return "bg-[#22C55E] text-white";
    if (s.includes("viewed") || s.includes("accessed"))
      return "bg-[#2563EB] text-white";
    if (s.includes("edited") || s.includes("updated"))
      return "bg-[#F59E0B] text-white";
    if (s.includes("completed")) return "bg-[#22C55E] text-white";
    return "bg-[#475569] text-white";
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const mins = Math.floor((now - date) / (1000 * 60));
      return `${mins} minutes ago`;
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
            onClick={() => navigate("teacher-dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
                Action Log
              </h1>
              <p className="text-[#475569] font-['Inter']">
                Track all your activities and interactions with student data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="text-[#475569]">
                <Download className="w-4 h-4 mr-2" />
                Export Log
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Summary Cards */}
          {summary && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#475569] font-['Inter'] mb-1">
                      Total Actions
                    </p>
                    <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">
                      {summary.totalActions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-[#2563EB]" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#475569] font-['Inter'] mb-1">
                      Today
                    </p>
                    <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">
                      {summary.todayActions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#F59E0B] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#475569] font-['Inter'] mb-1">
                      This Week
                    </p>
                    <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">
                      {summary.weekActions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#22C55E] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#22C55E]" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Filters and Search */}
          <Card className="bg-white border border-[#E2E8F0] rounded-2xl mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] w-4 h-4" />
                    <Input
                      placeholder="Search actions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="forms">Form Management</SelectItem>
                      <SelectItem value="responses">Student Responses</SelectItem>
                      <SelectItem value="analytics">Analytics & Reports</SelectItem>
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
                Chronological view of all your actions
              </p>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-[#475569] font-['Inter']">
                    Loading action log...
                  </div>
                </div>
              ) : filteredActions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Activity className="w-12 h-12 text-[#E2E8F0] mb-4" />
                  <p className="text-[#475569] font-['Inter'] text-center">
                    {searchTerm || filterType !== "all"
                      ? "No actions match your filters"
                      : "No actions logged yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActions.map((action, index) => (
                    <div
                      key={action.id || index}
                      className="flex items-start space-x-4 p-4 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                    >
                      {/* Icon */}
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
                              {action.targetId && <span>ID: {action.targetId}</span>}
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
