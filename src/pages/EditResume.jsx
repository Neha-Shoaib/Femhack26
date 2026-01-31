import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { resumeOperations } from '../utils/supabaseClient';
import { initialResumeData } from '../utils/helpers';
import ResumeForm from '../components/Resume/ResumeForm';
import ResumePreview from '../components/Resume/ResumePreview';
import toast from 'react-hot-toast';

const EditResume = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const resume = await resumeOperations.getResume(id);
      if (resume) {
        setResumeData({
          personalInfo: resume.personal_info || initialResumeData.personalInfo,
          education: resume.education || initialResumeData.education,
          skills: resume.skills || initialResumeData.skills,
          experience: resume.experience || initialResumeData.experience,
          projects: resume.projects || initialResumeData.projects,
        });
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resumeData.personalInfo.fullName) {
      toast.error('Please enter your full name');
      return;
    }

    setSaving(true);
    try {
      await resumeOperations.updateResume(id, resumeData);
      toast.success('Resume updated successfully!');
      navigate(`/view-resume/${id}`);
    } catch (error) {
      console.error('Error updating resume:', error);
      toast.error(error.message || 'Failed to update resume');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
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
              Edit Resume
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
              className="btn-secondary text-sm"
            >
              {activeTab === 'form' ? 'Show Preview' : 'Show Form'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
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

export default EditResume;
