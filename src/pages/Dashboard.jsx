import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { resumeOperations } from '../utils/supabaseClient';
import ResumeCard from '../components/Resume/ResumeCard';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchResumes();
  }, [user]);

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

  const handleEdit = (resume) => {
    window.location.href = `/edit-resume/${resume.id}`;
  };

  const handleView = (resume) => {
    window.location.href = `/view-resume/${resume.id}`;
  };

  const handleDelete = async (resume) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeOperations.deleteResume(resume.id);
        setResumes((prev) => prev.filter((r) => r.id !== resume.id));
        toast.success('Resume deleted successfully');
      } catch (error) {
        toast.error('Failed to delete resume');
      }
    }
  };

  const handleDownload = (resume) => {
    window.location.href = `/view-resume/${resume.id}?action=download`;
  };

  const filteredResumes = resumes.filter((resume) => {
    const fullName = resume.personal_info?.fullName?.toLowerCase() || '';
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'recent' && new Date(resume.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-16 transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your resumes and create new ones
            </p>
          </div>
          <Link to="/add-resume" className="btn-primary flex items-center gap-2">
            <FiPlus className="w-5 h-5" />
            Create New Resume
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resumes..."
              className="input-field pl-12"
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field pl-12 pr-8 appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all">All Resumes</option>
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{resumes.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Resumes</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resumes.filter(r => r.education?.length > 0).length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">With Education</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resumes.filter(r => r.experience?.length > 0).length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">With Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center">
              <FiPlus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No resumes found' : 'No resumes yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Create your first resume to get started'}
            </p>
            <Link to="/add-resume" className="btn-primary inline-flex items-center gap-2">
              <FiPlus className="w-5 h-5" />
              Create Resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
