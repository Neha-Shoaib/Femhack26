import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass border-b border-gray-200 dark:border-dark-100 z-40">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
          >
            {isSidebarOpen ? (
              <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="hidden md:block text-xl font-bold text-gray-900 dark:text-white">
              Resume Builder
            </span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <FiSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.email?.split('@')[0] || 'User'}
              </span>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-200 rounded-xl shadow-lg border border-gray-100 dark:border-dark-100 py-2 z-20 animate-slide-down">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-dark-100">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    {loading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
