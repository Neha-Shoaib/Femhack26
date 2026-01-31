import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import AddResume from './pages/AddResume';
import EditResume from './pages/EditResume';
import ViewResume from './pages/ViewResume';
import AuthCallback from './pages/AuthCallback';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-300">
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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-300">
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className={`pt-16 transition-all duration-300 min-h-screen ${
        isSidebarOpen ? 'lg:ml-64' : ''
      }`}>
        <div className={`${isSidebarOpen ? 'lg:ml-0' : ''} transition-all duration-300`}>
          {children}
        </div>
      </main>
      <Footer />
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
    if (path === '/dashboard' || path === '/settings') return <Dashboard />;
    if (path === '/add-resume') return <AddResume />;
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-300">
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
        path="/add-resume"
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
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AuthenticatedLayoutWrapper />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard or login */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <UnauthenticatedLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-300">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
                <a href="/login" className="btn-primary">Go to Login</a>
              </div>
            </div>
          </UnauthenticatedLayout>
        }
      />
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
              duration: 4000,
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
