import { FiEdit2, FiEye, FiTrash2, FiDownload, FiCalendar, FiBriefcase, FiBook, FiCode } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const ResumeCard = ({ resume, onEdit, onView, onDelete, onDownload }) => {
  const { personal_info, created_at, updated_at } = resume;
  const fullName = personal_info?.fullName || 'Untitled Resume';
  const hasChanges = updated_at && new Date(updated_at).getTime() > new Date(created_at).getTime() + 1000;

  return (
    <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-100 dark:border-dark-100 p-4 shadow-sm hover:shadow-lg transition-all duration-300 group h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1 text-sm">
              {fullName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
              <FiCalendar className="w-3 h-3 flex-shrink-0" />
              <span className="line-clamp-1">{formatDate(created_at)}</span>
            </p>
          </div>
        </div>
        
        {hasChanges && (
          <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full flex-shrink-0">
            Modified
          </span>
        )}
      </div>

      {/* Resume Stats */}
      <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 dark:bg-dark-100 rounded-lg mb-3 flex-shrink-0">
        <div className="text-center">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {resume.education?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Education</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {resume.experience?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Experience</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {resume.projects?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Projects</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 mt-auto flex-shrink-0">
        <button
          onClick={() => onView(resume)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 text-gray-700 dark:text-gray-200 rounded-lg transition-colors text-xs font-medium"
          title="View Resume"
        >
          <FiEye className="w-3.5 h-3.5" />
          View
        </button>
        <button
          onClick={() => onEdit(resume)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg transition-colors text-xs font-medium"
          title="Edit Resume"
        >
          <FiEdit2 className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => onDownload(resume)}
          className="p-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          title="Download PDF"
        >
          <FiDownload className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(resume)}
          className="p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-colors"
          title="Delete Resume"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
