import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { ActionLogger, createActionLogEntry } from "../utils/actionLogger";

const mockActions = [
  {
    id: 1,
    feedback: "Need more hands-on coding exercises during lectures",
    action: "Added 15 minutes of live coding demos to each lecture",
    status: "Completed",
    date: "2025-01-15",
    impact: "Positive - Students report better understanding",
  },
  {
    id: 2,
    feedback: "Assignment deadlines are too close together",
    action: "Restructured assignment schedule with 1-week minimum gaps",
    status: "Completed",
    date: "2025-01-10",
    impact: "Positive - Reduced student stress levels",
  },
  {
    id: 3,
    feedback: "Office hours conflict with other courses",
    action: "Added additional office hours on Wednesdays 2-4 PM",
    status: "In Progress",
    date: "2025-01-20",
    impact: "Pending - Implementation next week",
  },
  {
    id: 4,
    feedback: "Course materials are sometimes hard to find",
    action: "Created centralized course portal with organized resources",
    status: "Planned",
    date: "2025-01-22",
    impact: "Pending - Expected to improve accessibility",
  },
];

export function WeHeardYou({ navigate, currentUser }) {
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [newAction, setNewAction] = useState({
    feedback: "",
    action: "",
    expectedImpact: "",
  });

  useEffect(() => {
    if (currentUser) {
      ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          "FEEDBACK_ACTION_CREATED",
          "Accessed We Heard You dashboard to track feedback responses",
          "feedback-dashboard",
          "we-heard-you"
        )
      );
    }
  }, [currentUser]);

  const handleAddAction = async () => {
    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          "FEEDBACK_ACTION_CREATED",
          `Created new feedback action: "${newAction.action}"`,
          "feedback-action",
          "new",
          {
            feedback: newAction.feedback,
            action: newAction.action,
            expectedImpact: newAction.expectedImpact,
          }
        )
      );
    }

    // Add action logic (currently mock)
    setIsAddingAction(false);
    setNewAction({ feedback: "", action: "", expectedImpact: "" });
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
                We Heard You
              </h1>
              <p className="text-[#475569] font-['Inter']">
                Track feedback implementation and show students you're listening
              </p>
            </div>

            <Dialog open={isAddingAction} onOpenChange={setIsAddingAction}>
              <DialogTrigger asChild>
                <Button className="bg-[#22C55E] hover:bg-[#16a34a] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Action
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-['Poppins']">
                    Add New Action
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label className="text-[#0F172A] font-['Inter'] font-medium">
                      Student Feedback
                    </Label>
                    <Textarea
                      value={newAction.feedback}
                      onChange={(e) =>
                        setNewAction({
                          ...newAction,
                          feedback: e.target.value,
                        })
                      }
                      placeholder="What feedback did you receive from students?"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-[#0F172A] font-['Inter'] font-medium">
                      Action Taken
                    </Label>
                    <Textarea
                      value={newAction.action}
                      onChange={(e) =>
                        setNewAction({ ...newAction, action: e.target.value })
                      }
                      placeholder="What specific action are you taking to address this feedback?"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-[#0F172A] font-['Inter'] font-medium">
                      Expected Impact
                    </Label>
                    <Input
                      value={newAction.expectedImpact}
                      onChange={(e) =>
                        setNewAction({
                          ...newAction,
                          expectedImpact: e.target.value,
                        })
                      }
                      placeholder="What positive impact do you expect this to have?"
                      className="mt-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingAction(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddAction}
                      className="bg-[#22C55E] hover:bg-[#16a34a] text-white"
                    >
                      Add Action
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Actions",
                value: mockActions.length,
                icon: <MessageSquare className="w-6 h-6 text-[#2563EB]" />,
                color: "#2563EB",
              },
              {
                label: "Completed",
                value: mockActions.filter((a) => a.status === "Completed").length,
                icon: <CheckCircle className="w-6 h-6 text-[#22C55E]" />,
                color: "#22C55E",
              },
              {
                label: "In Progress",
                value: mockActions.filter((a) => a.status === "In Progress")
                  .length,
                icon: <Clock className="w-6 h-6 text-[#F59E0B]" />,
                color: "#F59E0B",
              },
              {
                label: "Planned",
                value: mockActions.filter((a) => a.status === "Planned").length,
                icon: <Calendar className="w-6 h-6 text-[#2563EB]" />,
                color: "#2563EB",
              },
            ].map((card, index) => (
              <Card
                key={index}
                className="p-6 bg-white border border-[#E2E8F0] rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#475569] font-['Inter'] mb-1">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 bg-opacity-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: card.color + "1A" }}
                  >
                    {card.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Actions Timeline */}
          <Card className="bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">
                Action Log
              </h2>
              <p className="text-[#475569] font-['Inter'] mt-1">
                Document how you're responding to student feedback
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {mockActions.map((action, index) => (
                  <div key={action.id} className="relative">
                    {index < mockActions.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-[#E2E8F0]" />
                    )}

                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          action.status === "Completed"
                            ? "bg-[#22C55E] text-white"
                            : action.status === "In Progress"
                            ? "bg-[#F59E0B] text-white"
                            : "bg-[#2563EB] text-white"
                        }`}
                      >
                        {action.status === "Completed" ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : action.status === "In Progress" ? (
                          <Clock className="w-6 h-6" />
                        ) : (
                          <Calendar className="w-6 h-6" />
                        )}
                      </div>

                      <div className="flex-1 bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
                        <div className="flex items-start justify-between mb-4">
                          <Badge
                            className={`${
                              action.status === "Completed"
                                ? "bg-[#22C55E] text-white"
                                : action.status === "In Progress"
                                ? "bg-[#F59E0B] text-white"
                                : "bg-[#2563EB] text-white"
                            }`}
                          >
                            {action.status}
                          </Badge>
                          <span className="text-sm text-[#475569] font-['Inter']">
                            {action.date}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-1">
                              Student Feedback:
                            </h4>
                            <p className="text-[#475569] font-['Inter'] bg-white p-3 rounded-lg border border-[#E2E8F0]">
                              "{action.feedback}"
                            </p>
                          </div>

                          <div>
                            <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-1">
                              Action Taken:
                            </h4>
                            <p className="text-[#475569] font-['Inter']">
                              {action.action}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-1">
                              Impact:
                            </h4>
                            <p
                              className={`font-['Inter'] ${
                                action.status === "Completed"
                                  ? "text-[#22C55E]"
                                  : "text-[#475569]"
                              }`}
                            >
                              {action.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
