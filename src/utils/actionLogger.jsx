// src/utils/actionLogger.js
import { projectId, publicAnonKey } from "./supabase/info";

// ---- Config ----
const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-cac4bc10`;

// ---- Internal request helper (no TS, no "private") ----
async function makeRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
        ...(options.headers || {}),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("ActionLogger request failed:", err);
    throw err;
  }
}

// ---- Public API (plain JS) ----
export const ActionLogger = {
  async logAction(entry) {
    try {
      const res = await makeRequest("/action-log", {
        method: "POST",
        body: JSON.stringify(entry),
      });
      if (res && res.success) {
        console.log(`Action logged: ${entry.teacherName} - ${entry.action}`);
        return res.actionId || null;
      }
      return null;
    } catch (err) {
      console.error("Failed to log action:", err);
      return null;
    }
  },

  async getActionLog(teacherId) {
    try {
      const res = await makeRequest(`/action-log/${teacherId}`);
      return (res && res.actions) || [];
    } catch (err) {
      console.error("Failed to fetch action log:", err);
      return [];
    }
  },

  async getActionLogSummary(teacherId) {
    try {
      const res = await makeRequest(`/action-log-summary/${teacherId}`);
      return res || null;
    } catch (err) {
      console.error("Failed to fetch action log summary:", err);
      return null;
    }
  },

  async getStudentRelatedActions(studentId) {
    try {
      const res = await makeRequest(`/student-actions/${studentId}`);
      return (res && res.actions) || [];
    } catch (err) {
      console.error("Failed to fetch student-related actions:", err);
      return [];
    }
  },
};

// ---- Action types (unchanged; plain JS) ----
export const ActionTypes = {
  // Form Management
  FORM_CREATED: "Form Created",
  FORM_EDITED: "Form Edited",
  FORM_PUBLISHED: "Form Published",
  FORM_CLOSED: "Form Closed",
  FORM_SHARED: "Form Shared",
  FORM_DUPLICATED: "Form Duplicated",

  // Student Response Management
  RESPONSES_VIEWED: "Student Responses Viewed",
  RESPONSE_DETAILED_VIEW: "Individual Response Viewed",
  RESPONSES_EXPORTED: "Responses Exported",
  RESPONSE_FLAGGED: "Response Flagged for Review",

  // Analytics & Reporting
  ANALYTICS_VIEWED: "Analytics Dashboard Viewed",
  REPORT_GENERATED: "Report Generated",
  CHART_EXPORTED: "Chart Exported",
  FILTER_APPLIED: "Analytics Filter Applied",

  // Feedback Actions
  FEEDBACK_ACTION_CREATED: "Feedback Action Created",
  FEEDBACK_ACTION_COMPLETED: "Feedback Action Completed",
  FEEDBACK_ACTION_UPDATED: "Feedback Action Updated",
  STUDENT_FEEDBACK_REVIEWED: "Student Feedback Reviewed",

  // Communication
  ANNOUNCEMENT_POSTED: "Announcement Posted",
  EMAIL_SENT: "Email Sent to Students",
  REMINDER_SENT: "Reminder Sent",

  // Settings & Configuration
  DEADLINE_EXTENDED: "Form Deadline Extended",
  SETTINGS_UPDATED: "Form Settings Updated",
  ACCESS_PERMISSIONS_CHANGED: "Access Permissions Modified",

  // System Access
  DASHBOARD_ACCESSED: "Teacher Dashboard Accessed",
  SYSTEM_LOGIN: "System Login",
  SYSTEM_LOGOUT: "System Logout",
};

// ---- Helper to build entries (plain JS) ----
export function createActionLogEntry(
  teacherId,
  teacherName,
  action,
  details,
  targetType,
  targetId,
  metadata
) {
  return {
    teacherId,
    teacherName,
    action,
    details,
    targetType,
    targetId,
    metadata,
    // You can add timestamp here if you want:
    // timestamp: new Date().toISOString(),
  };
}
