import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header';
import OverviewPage from './components/pages/OverviewPage';
import EmployeePage from './components/pages/EmployeePage';
import EmployeeDetailModal from './components/modals/EmployeeDetailModal';
import { Calendar, FileText, MessageSquare } from 'lucide-react';
import AnalyticsPage from './components/pages/AnalyticsPage';
import ClientsPage from './components/pages/ClientsPage';
import employeesData from './data/employees.json'; // <-- Import JSON
import AttendancePage from './components/pages/AttendancePage.jsx';
import AccountsPage from './components/pages/AccountsPage.jsx';
import JobPage from './components/pages/JobPage.jsx';
import ProjectsPage from './components/pages/ProjectsPage.jsx';
import ErrorBoundary from "./components/modals/ErrorBoundary.jsx";
import ConsultancyPage from './components/pages/ConsultancyPage.jsx';
import CalendarPage from './components/pages/CalendarPage.jsx';
import HolidayPage from './components/pages/HolidayPage.jsx';
import ReportPage from './components/pages/ReportPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegisterPage from './components/pages/RegisterPage.jsx';
import { onAuthStateChange } from './services/auth';
import ProfilePage from './components/pages/ProfilePage.jsx';

// Common style for placeholder pages
const placeholderStyle = "bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-96 flex items-center justify-center";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = employeesData;

  // Tab Content Renderer
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />;
      case 'employees':
        return <EmployeePage employees={employees} setSelectedEmployee={setSelectedEmployee} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'clients':
        return <ClientsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'accounts':
        return <AccountsPage />;
      case 'jobs':
        return <JobPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'consultancy':
        return <ConsultancyPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'holiday':
        return <HolidayPage />;
      case 'reports':
        return <ReportPage />;
      case 'profile':
        return <ProfilePage />; // Add profile page rendering
      case 'messages':
        return (
          <div className={placeholderStyle}>
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Messages component would go here</p>
            </div>
          </div>
        );
      default:
        return (
          <div className={placeholderStyle}>
            <p className="text-gray-500">Page not found.</p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col min-h-screen bg-gray-50 transition-all duration-300
          lg:ml-64" // <-- Add left margin for large screens to prevent content being hidden
        >
          <Header activeTab={activeTab} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-6">{renderContent()}</main>
        </div>

        {/* Employee Detail Modal */}
        <EmployeeDetailModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      </div>
    </ErrorBoundary>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
