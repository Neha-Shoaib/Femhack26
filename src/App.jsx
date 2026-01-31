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
import Dashboard from './pages/Dashboard';
import EditResume from './pages/EditResume';
import ViewResume from './pages/ViewResume';
import AuthCallback from './pages/AuthCallback';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout Component for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-dark-300">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

// Unauthenticated Layout
const UnauthenticatedLayout = ({ children }) => {
  return children;
};

// Wrapper that includes sidebar state
const AuthenticatedLayoutWrapper = () => {
  const location = useLocation();
  
  // Determine which component to render based on path
  const getComponent = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/settings') {
      return <Dashboard />;
    }
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
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <UnauthenticatedLayout>
              <Login />
            </UnauthenticatedLayout>
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <UnauthenticatedLayout>
              <Signup />
            </UnauthenticatedLayout>
          )
        }
      />
      
      {/* Auth Callback */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AuthenticatedLayoutWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AuthenticatedLayoutWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-resume/:id"
        element={
          <ProtectedRoute>
            <AuthenticatedLayoutWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-resume/:id"
        element={
          <ProtectedRoute>
            <AuthenticatedLayoutWrapper />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#363636',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
