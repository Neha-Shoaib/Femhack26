import { useState, useEffect } from 'react';
import { FiX, FiSave, FiTrash2, FiLayout, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { resumeOperations } from '../utils/supabaseClient';
import { initialResumeData } from '../utils/helpers';
import ResumeForm from '../components/Resume/ResumeForm';
import ResumePreview from '../components/Resume/ResumePreview';
import toast from 'react-hot-toast';

// Resume templates
const resumeTemplates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional with a gradient header',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with elegant typography',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with a colorful accent header',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean without decorative elements',
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate style with formal appearance',
    color: 'from-slate-600 to-slate-800',
  },
];

const AddResume = ({ isOpen, onClose, onSave, inline = false }) => {
  const { user } = useAuth();
  
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
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

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
      setResumeData(initialResumeData);
      if (onSave) onSave(resume);
      onClose();
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

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setShowTemplateSelector(false);
    toast.success(`Template "${resumeTemplates.find(t => t.id === templateId)?.name}" selected`);
  };

  // Inline mode wrapper
  if (inline) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-dark-200">
        {/* Header */}
        <div className="flex flex-col flex-shrink-0 border-b border-gray-200 dark:border-dark-100">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Create Resume
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between p-4 gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearDraft}
                className="btn-secondary text-sm flex items-center gap-2"
                title="Clear saved draft"
              >
                <FiTrash2 className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                className={`btn-secondary text-sm flex items-center gap-2 ${showTemplateSelector ? 'bg-primary-100 dark:bg-primary-900/30' : ''}`}
              >
                <FiLayout className="w-4 h-4" />
                Template: {resumeTemplates.find(t => t.id === selectedTemplate)?.name}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
                className="btn-secondary text-sm"
              >
                {activeTab === 'form' ? 'Preview' : 'Edit'}
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Template Selector */}
          {showTemplateSelector && (
            <div className="p-4 bg-gray-50 dark:bg-dark-300 border-t border-gray-200 dark:border-dark-100">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Choose a Template</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {resumeTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-dark-100 hover:border-gray-300 dark:hover:border-dark-50'
                    }`}
                  >
                    <div className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${template.color}`}></div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{template.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{template.description}</p>
                    {selectedTemplate === template.id && (
                      <div className="mt-2 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <FiCheck className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Tab Buttons */}
          <div className="flex gap-4 px-4 py-2 overflow-x-auto bg-gray-50 dark:bg-dark-300">
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'form' ? (
            <ResumeForm resumeData={resumeData} onChange={setResumeData} />
          ) : (
            <ResumePreview resumeData={resumeData} template={selectedTemplate} />
          )}
        </div>
      </div>
    );
  }

  // Slide-over mode (original)
  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Slide-over panel */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[480px] lg:w-[560px] bg-white dark:bg-dark-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-100">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create Resume
                </h1>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-between p-4 gap-2 flex-wrap border-b border-gray-200 dark:border-dark-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearDraft}
                  className="btn-secondary text-sm flex items-center gap-2"
                  title="Clear saved draft"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Clear
                </button>
                <button
                  onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
                  className="btn-secondary text-sm"
                >
                  {activeTab === 'form' ? 'Preview' : 'Edit'}
                </button>
              </div>
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
            
            {/* Tab Buttons */}
            <div className="flex gap-4 px-4 py-2 overflow-x-auto bg-gray-50 dark:bg-dark-300">
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

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {activeTab === 'form' ? (
              <ResumeForm resumeData={resumeData} onChange={setResumeData} />
            ) : (
              <ResumePreview resumeData={resumeData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddResume;
