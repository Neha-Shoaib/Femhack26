import { useState, useEffect, useMemo } from 'react';
import { FiPlus, FiFileText, FiSearch, FiFilter, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeOperations } from '../utils/supabaseClient';
import ResumeCard from '../components/Resume/ResumeCard';
import AddResume from './AddResume';
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
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <button
              onClick={handleBackToDashboard}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Back to dashboard"
            >
              <FiArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Resume
            </h1>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col mt-12">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Top Section – Welcome + CTA buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.email?.split('@')[0] || 'User'} 👋
            </h1>
            <p className="mt-1.5 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Create, manage and organize your resumes
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchParams({ action: 'add' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              New Resume
            </button>

            <button
              onClick={() => document.getElementById('resume-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFileText className="w-5 h-5" />
              My Resumes
            </button>
          </div>
        </div>

        {/* Search + Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-3 sm:min-w-[220px]">
            <FiFilter className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name (A–Z)</option>
              <option value="modified">Recently modified</option>
            </select>
          </div>
        </div>

        {/* Resume Cards Area */}
        <section id="resume-list" className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                <FiFileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {searchQuery ? 'No matching resumes' : 'No resumes yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                {searchQuery
                  ? 'Try adjusting your search term'
                  : 'Start by creating your first professional resume'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setSearchParams({ action: 'add' })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                  Create Resume
                </button>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5">
                My Resumes ({filteredResumes.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pb-8">
                {filteredResumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onEdit={() => handleEdit(resume)}
                    onView={() => handleView(resume)}
                    onDelete={() => handleDelete(resume)}
                    onDownload={() => handleDownload(resume)}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;