import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cac4bc10/health", (c) => {
  return c.json({ status: "ok" });
});

// Action Log endpoints
app.post("/make-server-cac4bc10/action-log", async (c) => {
  try {
    const { teacherId, teacherName, action, details, targetType, targetId, metadata } = await c.req.json();
    
    if (!teacherId || !teacherName || !action) {
      return c.json({ error: "Missing required fields: teacherId, teacherName, action" }, 400);
    }

    const actionEntry = {
      id: crypto.randomUUID(),
      teacherId,
      teacherName,
      action,
      details: details || '',
      targetType: targetType || '',
      targetId: targetId || '',
      metadata: metadata || {},
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };

    const key = `action_log:${teacherId}:${actionEntry.id}`;
    await kv.set(key, actionEntry);

    console.log(`Action logged: ${teacherName} - ${action}`);
    return c.json({ success: true, actionId: actionEntry.id });
  } catch (error) {
    console.log(`Error logging action: ${error}`);
    return c.json({ error: "Failed to log action" }, 500);
  }
});

app.get("/make-server-cac4bc10/action-log/:teacherId", async (c) => {
  try {
    const teacherId = c.req.param("teacherId");
    if (!teacherId) {
      return c.json({ error: "Teacher ID is required" }, 400);
    }

    const prefix = `action_log:${teacherId}:`;
    const actions = await kv.getByPrefix(prefix);
    
    // Sort by timestamp (newest first)
    const sortedActions = actions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return c.json({ actions: sortedActions });
  } catch (error) {
    console.log(`Error fetching action log: ${error}`);
    return c.json({ error: "Failed to fetch action log" }, 500);
  }
});

app.get("/make-server-cac4bc10/action-log-summary/:teacherId", async (c) => {
  try {
    const teacherId = c.req.param("teacherId");
    if (!teacherId) {
      return c.json({ error: "Teacher ID is required" }, 400);
    }

    const prefix = `action_log:${teacherId}:`;
    const actions = await kv.getByPrefix(prefix);
    
    const today = new Date().toLocaleDateString();
    const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    const summary = {
      totalActions: actions.length,
      todayActions: actions.filter(a => a.date === today).length,
      weekActions: actions.filter(a => new Date(a.timestamp) >= new Date(thisWeek)).length,
      recentActions: actions
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5)
    };

    return c.json(summary);
  } catch (error) {
    console.log(`Error fetching action log summary: ${error}`);
    return c.json({ error: "Failed to fetch action log summary" }, 500);
  }
});

// Student-related actions endpoint
app.get("/make-server-cac4bc10/student-actions/:studentId", async (c) => {
  try {
    const studentId = c.req.param("studentId");
    if (!studentId) {
      return c.json({ error: "Student ID is required" }, 400);
    }

    // Get all action logs from all teachers
    const allActions = await kv.getByPrefix("action_log:");
    
    // Filter actions that relate to this specific student
    const studentRelatedActions = allActions.filter(action => 
      action.targetId === studentId || 
      (action.details && action.details.toLowerCase().includes(studentId.toLowerCase())) ||
      (action.metadata && action.metadata.studentId === studentId)
    );
    
    // Sort by timestamp (newest first)
    const sortedActions = studentRelatedActions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return c.json({ actions: sortedActions });
  } catch (error) {
    console.log(`Error fetching student-related actions: ${error}`);
    return c.json({ error: "Failed to fetch student-related actions" }, 500);
  }
});

Deno.serve(app.fetch);