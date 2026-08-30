import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiDownload, FiCheckCircle } from 'react-icons/fi';
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

      const candidateName = resume?.personal_info?.fullName?.trim() || 'Resume';
      const cleanFileName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
      
      // ATS-optimized pdf generation settings
      const opt = {
        margin: [8, 8, 8, 8],
        filename: `${cleanFileName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 3, 
          useCORS: true, 
          letterRendering: true,
          scrollY: 0 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      toast.success('ATS-Optimized PDF downloaded successfully!');
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
    languages: resume.languages || [],
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090D16]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Controls Bar */}
      <header className="sticky top-0 z-30 bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left Title and Back Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:bg-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all duration-200"
              aria-label="Back to dashboard"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-xs">
                  {resume?.personal_info?.fullName || 'Resume Preview'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiCheckCircle className="w-3 h-3" />
                  ATS Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Standard A4 Format • Clean Parser Structure</p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate(`/edit-resume/${id}`)}
              className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <FiEdit2 className="w-4 h-4 text-blue-400" />
              <span>Edit</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <FiDownload className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Resume Canvas Container */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center items-start">
        {resumeData && (
          <div className="w-full max-w-[210mm] bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-700/30 p-2 sm:p-4">
            <div className="resume-preview bg-white w-full">
              <ResumePreview 
                resumeData={resumeData} 
                template={resume?.template || 'modern'} 
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewResume;