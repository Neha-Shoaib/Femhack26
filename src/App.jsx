import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPasswordModal from '../src/components/Layout/ForgotPasswordModal';
import ResetPassword from '../src/pages/ResetPassword';
import Chatbot from '../src/components/Chatbot/Chatbot';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EditResume from './pages/EditResume';
import ViewResume from './pages/ViewResume';
import AuthCallback from './pages/AuthCallback';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#090D16]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Unified Responsive Dashboard Layout
const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-full flex flex-col bg-[#090D16] text-slate-100 overflow-hidden font-sans">
      {/* Global Header */}
      <Header 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Workspace Body: Collapsible Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content & Footer Area */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-between bg-[#090D16]">
          <main className="flex-1 w-full">
            {children}
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

const UnauthenticatedLayout = ({ children }) => children;

const AuthenticatedLayoutWrapper = () => {
  const location = useLocation();
  
  const getComponent = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/settings') return <Dashboard />;
    if (path === '/add-resume') return <Dashboard />;
    if (path.startsWith('/edit-resume/')) return <EditResume />;
    if (path.startsWith('/view-resume/')) return <ViewResume />;
    return <Dashboard />;
  };

  return (
    <AuthenticatedLayout>
      {getComponent()}
    </AuthenticatedLayout>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#090D16]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : (
            <UnauthenticatedLayout><Login /></UnauthenticatedLayout>
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : (
            <UnauthenticatedLayout><Signup /></UnauthenticatedLayout>
          )
        }
      />

      {/* Forgot Password Route */}
      <Route
        path="/forgot-password"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : (
            <UnauthenticatedLayout>
              <ForgotPasswordModal isOpen={true} onClose={() => window.history.back()} />
            </UnauthenticatedLayout>
          )
        }
      />

      {/* Supabase Password Reset Callback Route */}
      <Route
        path="/reset-password"
        element={
          <UnauthenticatedLayout>
            <ResetPassword />
          </UnauthenticatedLayout>
        }
      />

      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute><AuthenticatedLayoutWrapper /></ProtectedRoute>}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute><AuthenticatedLayoutWrapper /></ProtectedRoute>}
      />
      <Route
        path="/edit-resume/:id"
        element={<ProtectedRoute><AuthenticatedLayoutWrapper /></ProtectedRoute>}
      />
      <Route
        path="/view-resume/:id"
        element={<ProtectedRoute><AuthenticatedLayoutWrapper /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />

          {/* 24/7 AI Floating Chatbot Component */}
          <Chatbot />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0d1424',
                color: '#fff',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '13px',
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}