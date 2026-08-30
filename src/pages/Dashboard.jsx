import { useState, useEffect, useMemo } from 'react';
import { 
  FiPlus, 
  FiFileText, 
  FiSearch, 
  FiFilter, 
  FiArrowLeft, 
  FiX, 
  FiTrendingUp, 
  FiClock, 
  FiZap
} from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeOperations } from '../utils/supabaseClient';
import ResumeCard from '../components/Resume/ResumeCard';
import AddResume from './AddResume';
import Chatbot from '../components/Chatbot/Chatbot';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const showAddForm = searchParams.get('action') === 'add';

  useEffect(() => {
    if (!user?.id) return;
    fetchResumes();
  }, [user?.id]);

  const fetchResumes = async () => {
    try {
      const data = await resumeOperations.getResumes(user.id);
      setResumes(data || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resume) => navigate(`/edit-resume/${resume.id}`);
  const handleView = (resume) => navigate(`/view-resume/${resume.id}`);
  const handleDownload = (resume) => navigate(`/view-resume/${resume.id}?action=download`);

  const handleDelete = async (resume) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await resumeOperations.deleteResume(resume.id);
      setResumes((prev) => prev.filter((r) => r.id !== resume.id));
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const handleResumeSaved = (newResume) => {
    setResumes((prev) => [newResume, ...prev]);
    setSearchParams({});
    setTimeout(() => {
      document.getElementById('resume-list')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleBackToDashboard = () => setSearchParams({});

  const filteredResumes = useMemo(() => {
    let result = [...resumes];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((r) =>
        r.personal_info?.fullName?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'name':
        result.sort((a, b) =>
          (a.personal_info?.fullName || '').localeCompare(b.personal_info?.fullName || '')
        );
        break;
      case 'modified':
        result.sort((a, b) => {
          const dateA = new Date(a.updated_at || a.created_at);
          const dateB = new Date(b.updated_at || b.created_at);
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    return result;
  }, [resumes, searchQuery, sortBy]);

  // ──────────────────────────────────────────────
  //               CREATE RESUME MODE
  // ──────────────────────────────────────────────
  if (showAddForm) {
    return (
      <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100">
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#090D16]/90 border-b border-slate-800/80 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToDashboard}
                className="p-2 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:bg-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all duration-200"
                aria-label="Back to dashboard"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Create Resume
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    Draft
                  </span>
                </h1>
                <p className="text-xs text-slate-400">Fill in details and choose a template layout</p>
              </div>
            </div>

            <button
              onClick={handleBackToDashboard}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              Cancel
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <AddResume
              isOpen={true}
              onClose={handleBackToDashboard}
              onSave={handleResumeSaved}
              inline={true}
            />
          </div>
        </main>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  //               MAIN DASHBOARD
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-14">
      {/* Decorative background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-20 w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 lg:pt-16 pt-6 gap-6">
        
        {/* Top Header Card / Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0d1527]/90 to-blue-950/40 border border-slate-800/80 p-5 sm:p-7 shadow-xl shadow-black/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-medium">
                <FiZap className="w-3.5 h-3.5 text-blue-400" />
                <span>Resume Workspace</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Welcome back, <span className="bg-gradient-to-r from-white via-slate-200 to-blue-300 bg-clip-text text-transparent">{user?.email?.split('@')[0] || 'User'}</span> 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Create, organize, and tailor your ATS-optimized resumes for every application.
              </p>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSearchParams({ action: 'add' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]"
              >
                <FiPlus className="w-4 h-4" />
                <span>New Resume</span>
              </button>

              <button
                onClick={() => document.getElementById('resume-list')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 shadow-sm"
              >
                <FiFileText className="w-4 h-4 text-blue-400" />
                <span>My Resumes</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <FiFileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Resumes</p>
                <p className="text-lg font-bold text-white">{resumes.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <FiClock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Latest Update</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                  {resumes.length > 0 
                    ? new Date(resumes[0]?.updated_at || resumes[0]?.created_at).toLocaleDateString()
                    : 'None yet'}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FiTrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Status</p>
                <p className="text-xs sm:text-sm font-semibold text-emerald-400">ATS Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
          {/* Search Box */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search resumes by candidate name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 sm:w-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 pl-1 hidden sm:flex">
              <FiFilter className="w-3.5 h-3.5 text-blue-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-44 px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name (A–Z)</option>
              <option value="modified">Recently modified</option>
            </select>
          </div>
        </div>

        {/* Resumes Grid Section */}
        <section id="resume-list" className="flex-1 flex flex-col">
          {loading ? (
            /* Skeleton Loading State */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item} 
                  className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4 animate-pulse"
                >
                  <div className="h-36 bg-slate-800/60 rounded-lg" />
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800/80 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredResumes.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center min-h-[42vh] text-center p-8 sm:p-12 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 my-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 shadow-lg shadow-blue-500/5">
                <FiFileText className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                {searchQuery ? 'No resumes matching your search' : 'No resumes built yet'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                {searchQuery
                  ? `We couldn't find anything for "${searchQuery}". Try searching with a different name or clear the query.`
                  : 'Get started by creating your first professional, ATS-optimized resume now.'}
              </p>
              
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                >
                  Clear Search
                </button>
              ) : (
                <button
                  onClick={() => setSearchParams({ action: 'add' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                >
                  <FiPlus className="w-4 h-4" />
                  Create First Resume
                </button>
              )}
            </div>
          ) : (
            /* Populated Resumes Grid */
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span>Saved Resumes</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 text-xs font-bold border border-slate-700">
                    {filteredResumes.length}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
                {filteredResumes.map((resume) => (
                  <div 
                    key={resume.id}
                    className="transition-transform duration-200 hover:-translate-y-1"
                  >
                    <ResumeCard
                      resume={resume}
                      onEdit={() => handleEdit(resume)}
                      onView={() => handleView(resume)}
                      onDelete={() => handleDelete(resume)}
                      onDownload={() => handleDownload(resume)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* Chatbot - Only show on main dashboard view */}
      {!showAddForm && <Chatbot />}
    </div>
  );
};

export default Dashboard;