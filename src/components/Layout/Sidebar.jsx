import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiPlus, FiSettings } from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen, onClose }) => {
  const navigate = useNavigate();

  const handleAddResume = () => {
    navigate('/dashboard?action=add');
    onClose();
  };

  return (
    <>
      {/* Backdrop - mobile only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
                    transform transition-transform duration-300 ease-in-out z-30 lg:z-auto
                    lg:relative lg:transform-none
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <FiHome className="w-5 h-5" />
              Dashboard
            </NavLink>

            <button
              onClick={handleAddResume}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <FiPlus className="w-5 h-5" />
              New Resume
            </button>
          </div>

          {/* Bottom section */}
          <div className="px-3 py-5 border-t border-gray-200 dark:border-gray-800">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <FiSettings className="w-5 h-5" />
              Settings
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;