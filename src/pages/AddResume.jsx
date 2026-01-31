import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { resumeOperations } from '../utils/supabaseClient';
import { initialResumeData } from '../utils/helpers';
import ResumeForm from '../components/Resume/ResumeForm';
import ResumePreview from '../components/Resume/ResumePreview';
import toast from 'react-hot-toast';

const AddResume = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Load saved resume data from localStorage on mount
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem('resumeDraft');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Failed to parse saved resume data:', e);
        return initialResumeData;
      }
    }
    return initialResumeData;
  });
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
  }, [resumeData]);

  // Clear draft when successfully saved
  const handleSave = async () => {
    if (!resumeData.personalInfo.fullName) {
      toast.error('Please enter your full name');
      return;
    }

    setLoading(true);
    try {
      const resume = await resumeOperations.createResume(user.id, resumeData);
      toast.success('Resume created successfully!');
      // Clear draft after successful save
      localStorage.removeItem('resumeDraft');
      navigate(`/view-resume/${resume.id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error(error.message || 'Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  const handleClearDraft = () => {
    if (window.confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      localStorage.removeItem('resumeDraft');
      setResumeData(initialResumeData);
      toast.success('Draft cleared');
    }
  };

  return (
    <div className="min-h-screen pt-16 transition-all duration-300">
      {/* Header */}
      <div className="sticky top-16 z-20 bg-white/80 dark:bg-dark-200/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Resume
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleClearDraft}
              className="btn-secondary text-sm flex items-center gap-2"
              title="Clear saved draft"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear Draft
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
              className="btn-secondary text-sm"
            >
              {activeTab === 'form' ? 'Show Preview' : 'Show Form'}
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Resume'}
            </button>
          </div>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex gap-4 px-4 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'form'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-200'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-200'
            }`}
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {activeTab === 'form' ? (
          <div className="max-w-4xl mx-auto">
            <ResumeForm resumeData={resumeData} onChange={setResumeData} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ResumePreview resumeData={resumeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddResume;
