import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const displayName = user?.email?.split('@')[0] || 'User';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 z-40 transition-colors">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 -ml-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {isSidebarOpen ? (
              <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white hidden sm:block">
              Resume Builder
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <FiSun className="w-5 h-5 text-amber-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* User area – dropdown on mobile, inline on larger screens */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline font-medium text-gray-700 dark:text-gray-200 text-sm">
                {displayName}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 md:hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Logout – visible only on larger screens */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;