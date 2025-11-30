import { useState } from "react";
import { Toaster } from "./components/ui/sonner";


import Landing from "./components/Landing";
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import AdminLogin from "./components/AdminLogin";
import StudentSignup from "./components/StudentSignup";
import TeacherSignup from "./components/TeacherSignup";
import AdminSignup from "./components/AdminSignup";
import ForgotPassword from "./components/ForgotPassword";
import { StudentDashboard } from "./components/StudentDashboard";
import { FeedbackForm } from "./components/FeedbackForm";
import { SubmissionConfirmation } from "./components/SubmissionConfirmation";
import { AggregatedResults } from "./components/AggregatedResults";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { FormBuilder } from "./components/FormBuilder";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { WeHeardYou } from "./components/WeHeardYou";
import { InstitutionDashboard } from "./components/InstitutionDashboard";
import { SettingsPage } from "./components/SettingsPage";
import { ActionLog } from "./components/ActionLog";
import { StudentActionLog } from "./components/StudentActionLog";


const mockUsers = {
  students: [
    {
      id: "1",
      email: "student@university.edu",
      password: "password123",
      name: "John Student",
    },
    {
      id: "2",
      email: "jane.doe@university.edu",
      password: "password123",
      name: "Jane Doe",
    },
    {
      id: "3",
      email: "alex.smith@university.edu",
      password: "password123",
      name: "Alex Smith",
    },
  ],
  teachers: [
    {
      id: "1",
      email: "teacher@university.edu",
      password: "password123",
      name: "Dr. Johnson",
    },
    {
      id: "2",
      email: "prof.smith@university.edu",
      password: "password123",
      name: "Prof. Smith",
    },
    {
      id: "3",
      email: "mary.wilson@university.edu",
      password: "password123",
      name: "Dr. Mary Wilson",
    },
  ],
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("landing");
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [completedForms, setCompletedForms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  const navigate = (screen, role, user, formType) => {
    setCurrentScreen(screen);
    if (role) setUserRole(role);
    if (user) setCurrentUser(user);
    if (formType) setSelectedFormType(formType);
  };

  const registerUser = (userData, role) => {
    // role: "student" | "teacher"
    const userDatabase = role === "student" ? users.students : users.teachers;
    const existingUser = userDatabase.find((u) => u.email === userData.email);
    if (existingUser) return false; // already exists

    const newUser = {
      id: (userDatabase.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      name: `${userData.firstName} ${userData.lastName}`,
    };

    if (role === "student") {
      setUsers((prev) => ({
        ...prev,
        students: [...prev.students, newUser],
      }));
    } else {
      setUsers((prev) => ({
        ...prev,
        teachers: [...prev.teachers, newUser],
      }));
    }

    return true;
  };

  const authenticateUser = (email, password, role) => {
    // role: "student" | "teacher"
    const userDatabase = role === "student" ? users.students : users.teachers;
    const user = userDatabase.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userContext = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role,
      };
      setIsAuthenticated(true);
      return userContext;
    }
    return null;
  };

  const completeForm = (formId, formTitle, formType) => {
    const newCompletedForm = {
      id: formId,
      title: formTitle,
      type: formType,
      submittedDate: new Date().toLocaleDateString(),
      status: "Results Available",
    };
    setCompletedForms((prev) => [...prev, newCompletedForm]);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setCompletedForms([]);
    setCurrentScreen("landing");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return <Landing navigate={navigate} />;

      case "student-login":
        return (
          <StudentLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "teacher-login":
        return (
          <TeacherLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "admin-login":
        return <AdminLogin navigate={navigate} />;

      case "student-signup":
        return (
          <StudentSignup navigate={navigate} registerUser={registerUser} />
        );

      case "teacher-signup":
        return (
          <TeacherSignup navigate={navigate} registerUser={registerUser} />
        );

      case "admin-signup":
        return <AdminSignup navigate={navigate} />;

      case "forgot-password":
        return <ForgotPassword navigate={navigate} />;

      case "student-dashboard":
        return isAuthenticated && currentUser?.role === "student" ? (
          <StudentDashboard
            navigate={navigate}
            currentUser={currentUser}
            completedForms={completedForms}
            logout={logout}
          />
        ) : (
          <StudentLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "feedback-form":
        return isAuthenticated && currentUser ? (
          <FeedbackForm
            navigate={navigate}
            currentUser={currentUser}
            formType={selectedFormType}
          />
        ) : (
          <StudentLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "submission-confirmation":
        return isAuthenticated && currentUser ? (
          <SubmissionConfirmation
            navigate={navigate}
            currentUser={currentUser}
            completeForm={completeForm}
            selectedFormType={selectedFormType}
          />
        ) : (
          <StudentLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "aggregated-results":
        return <AggregatedResults navigate={navigate} />;

      case "student-action-log":
        return isAuthenticated && currentUser?.role === "student" ? (
          <StudentActionLog navigate={navigate} currentUser={currentUser} />
        ) : (
          <StudentLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "teacher-dashboard":
        return isAuthenticated && currentUser?.role === "teacher" ? (
          <TeacherDashboard
            navigate={navigate}
            currentUser={currentUser}
            logout={logout}
          />
        ) : (
          <TeacherLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "form-builder":
        return isAuthenticated && currentUser?.role === "teacher" ? (
          <FormBuilder navigate={navigate} currentUser={currentUser} />
        ) : (
          <TeacherLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "analytics":
        return isAuthenticated && currentUser?.role === "teacher" ? (
          <AnalyticsPage navigate={navigate} currentUser={currentUser} />
        ) : (
          <TeacherLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "we-heard-you":
        return isAuthenticated && currentUser?.role === "teacher" ? (
          <WeHeardYou navigate={navigate} currentUser={currentUser} />
        ) : (
          <TeacherLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "action-log":
        return isAuthenticated && currentUser?.role === "teacher" ? (
          <ActionLog navigate={navigate} currentUser={currentUser} />
        ) : (
          <TeacherLogin navigate={navigate} authenticateUser={authenticateUser} />
        );

      case "institution-dashboard":
        return <InstitutionDashboard navigate={navigate} />;

      case "settings":
        return <SettingsPage navigate={navigate} />;

      default:
        return <Landing navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {renderScreen()}
      <Toaster />
    </div>
  );
}
