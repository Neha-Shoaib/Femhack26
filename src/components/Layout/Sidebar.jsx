import { NavLink } from 'react-router-dom';
import { FiHome, FiPlus, FiSettings, FiHelpCircle } from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen }) => {
  const navItems = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/add-resume', icon: FiPlus, label: 'Add Resume' },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
      
      <aside
        className={`fixed top-16 left-0 h-full w-64 bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-100 
                    transform transition-transform duration-300 ease-in-out z-30
                    lg:relative lg:transform-none
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-dark-100 pt-4 space-y-2">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100'
                }`
              }
            >
              <FiSettings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </NavLink>
            
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100 transition-all duration-200"
            >
              <FiHelpCircle className="w-5 h-5" />
              <span className="font-medium">Help & Support</span>
            </button>
          </div>

          {/* Upgrade Card */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <h4 className="font-semibold mb-1">Resume Builder Pro</h4>
            <p className="text-sm text-primary-100 mb-3">
              Unlock premium templates and features
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
