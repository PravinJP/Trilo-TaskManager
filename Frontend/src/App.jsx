import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainDashboard from "./pages/Dashboard/MainDashboard";
import TaskDashboard from "./pages/Dashboard/TaskDashboard";
import TeamDashboard from "./pages/Dashboard/TeamDashboard";
import TimerPage from "./pages/Dashboard/TimerPage";
import CalendarPage from "./pages/Dashboard/CalendarPage";
import CreateTaskPage from "./pages/Dashboard/CreateTaskPage"; 
import MainNavbar from "./components/MainNavbar";
import DailyReport from "./pages/Dashboard/Reports";

// Wrapper to handle Navbar and activePage dynamically
const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Determine if current page should show navbar
  const hideNavbarPaths = ["/", "/signin", "/signup"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  // Determine active page from URL
  const path = location.pathname.split("/")[1] || "dashboard";
  const activePageName = path.charAt(0).toUpperCase() + path.slice(1);
  const [activePage, setActivePage] = useState(activePageName);

  useEffect(() => {
    setActivePage(activePageName);
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <MainNavbar activePage={activePage} setActivePage={setActivePage} user={user} />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/tasks" element={<TaskDashboard />} />
            <Route path="/teams" element={<TeamDashboard />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/createtask" element={<CreateTaskPage />} />
            <Route path="edit-task/:id" element={<CreateTaskPage />} />
            <Route path="/reports" element={<DailyReport />} />
            {/* Catch-all: Redirect unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </NavbarWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
