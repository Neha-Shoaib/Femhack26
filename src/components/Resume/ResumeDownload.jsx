import { useState } from 'react';
import { FiDownload, FiLoader } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

const ResumeDownload = ({ resumeData, fileName }) => {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    
    try {
      // Create a temporary container for PDF generation
      const container = document.createElement('div');
      container.style.width = '210mm';
      container.style.minHeight = '297mm';
      container.style.padding = '0';
      container.style.margin = '0';
      container.style.background = 'white';
      
      // Clone the resume preview content
      const resumePreview = document.querySelector('.resume-preview');
      if (resumePreview) {
        container.innerHTML = resumePreview.innerHTML;
        document.body.appendChild(container);
        
        const opt = {
          margin: 0,
          filename: fileName || `resume-${Date.now()}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        
        await html2pdf().set(opt).from(container).save();
        
        document.body.removeChild(container);
        toast.success('Resume downloaded successfully!');
      } else {
        toast.error('Could not find resume preview');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="btn-primary flex items-center gap-2"
    >
      {generating ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <FiDownload className="w-5 h-5" />
          Download PDF
        </>
      )}
    </button>
  );
};

export default ResumeDownload;
