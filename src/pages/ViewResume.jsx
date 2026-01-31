import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiDownload } from 'react-icons/fi';
import { resumeOperations } from '../utils/supabaseClient';
import ResumePreview from '../components/Resume/ResumePreview';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';

const ViewResume = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, [id]);

  useEffect(() => {
    if (searchParams.get('action') === 'download' && resume) {
      handleDownload();
      // Clear the query parameter
      window.history.replaceState({}, '', `/view-resume/${id}`);
    }
  }, [resume, searchParams]);

  const fetchResume = async () => {
    try {
      const data = await resumeOperations.getResume(id);
      if (data) {
        setResume(data);
      } else {
        toast.error('Resume not found');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      const element = document.querySelector('.resume-preview');
      if (!element) {
        toast.error('Could not find resume preview');
        return;
      }

      const fileName = resume.personal_info?.fullName?.replace(/\s+/g, '-') || 'resume';
      
      const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume');
    } finally {
      setDownloading(false);
    }
  };

  const resumeData = resume ? {
    personalInfo: resume.personal_info || {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      portfolio: '',
      summary: '',
    },
    education: resume.education || [],
    skills: resume.skills || [],
    experience: resume.experience || [],
    projects: resume.projects || [],
  } : null;

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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
              {resume?.personal_info?.fullName || 'Resume Preview'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/edit-resume/${id}`)}
              className="btn-secondary flex items-center gap-2"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary flex items-center gap-2"
            >
              {downloading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FiDownload className="w-4 h-4" />
              )}
              {downloading ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 overflow-auto">
        {resumeData && (
          <div className="max-w-[210mm] mx-auto">
            <ResumePreview resumeData={resumeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResume;
