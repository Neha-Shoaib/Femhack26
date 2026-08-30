import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiPlus, 
  FiSettings, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX 
} from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen, onToggleSidebar, onClose }) => {
  const navigate = useNavigate();

  const handleAddResume = () => {
    navigate('/dashboard?action=add');
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const navLinkStyle = (isActive) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    } ${!isSidebarOpen ? 'lg:justify-center lg:px-2' : ''}`;

  return (
    <>
      {/* Mobile Dark Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:static lg:z-auto bg-[#090D16] border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 ease-in-out select-none
          ${isSidebarOpen ? 'translate-x-0 w-60' : '-translate-x-full lg:translate-x-0 lg:w-16'}
        `}
      >
        {/* Top Control Strip */}
        <div className="flex items-center justify-between px-3.5 py-6 border-b border-slate-800/80">
          <span className={`text-[11px] font-bold uppercase tracking-wider text-slate-400 ${!isSidebarOpen ? 'lg:hidden' : ''}`}>
            Navigation
          </span>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className={`hidden lg:flex p-1.5 rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors ${
              !isSidebarOpen ? 'mx-auto' : ''
            }`}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <FiChevronLeft className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Main Links */}
        <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/dashboard"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) => navLinkStyle(isActive)}
            title="Dashboard"
          >
            <FiHome className="w-4 h-4 shrink-0" />
            <span className={`truncate ${!isSidebarOpen ? 'lg:hidden' : ''}`}>
              Dashboard
            </span>
          </NavLink>

          <button
            onClick={handleAddResume}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all ${
              !isSidebarOpen ? 'lg:justify-center lg:px-2' : ''
            }`}
            title="New Resume"
          >
            <FiPlus className="w-4 h-4 shrink-0 text-blue-400" />
            <span className={`truncate ${!isSidebarOpen ? 'lg:hidden' : ''}`}>
              New Resume
            </span>
          </button>
        </div>

        {/* Bottom Settings Link */}
        {/* <div className="px-3 py-3.5 border-t border-slate-800/80">
          <NavLink
            to="/settings"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) => navLinkStyle(isActive)}
            title="Settings"
          >
            <FiSettings className="w-4 h-4 shrink-0" />
            <span className={`truncate ${!isSidebarOpen ? 'lg:hidden' : ''}`}>
              Settings
            </span>
          </NavLink>
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;