import React from 'react';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const username = user?.email?.split('@')[0] || 'User';
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="h-14 w-full bg-[#090D16] border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Sidebar Toggle + Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            CV<span className="text-blue-500">Craft</span>
          </span>
        </div>
      </div>

      {/* Right: User Profile + Logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            {initial}
          </div>
          <span className="text-xs text-slate-300 font-medium hidden sm:inline max-w-[120px] truncate">
            {username}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs font-medium transition-all"
        >
          <FiLogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;