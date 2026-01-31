import { FiEdit2, FiEye, FiTrash2, FiDownload, FiCalendar } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const ResumeCard = ({ resume, onEdit, onView, onDelete, onDownload }) => {
  const { personal_info, created_at, updated_at } = resume;
  const fullName = personal_info?.fullName || 'Untitled Resume';
  const hasChanges = updated_at && new Date(updated_at).getTime() > new Date(created_at).getTime() + 1000;

  return (
    <div className="card-glow p-6 group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {fullName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              {formatDate(created_at)}
            </p>
          </div>
        </div>
        
        {hasChanges && (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
            Modified
          </span>
        )}
      </div>

      {/* Resume Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-dark-100 rounded-xl">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {resume.education?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Education</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {resume.experience?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {resume.projects?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(resume)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
          title="View Resume"
        >
          <FiEye className="w-4 h-4" />
          <span className="text-sm font-medium">View</span>
        </button>
        <button
          onClick={() => onEdit(resume)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg transition-colors"
          title="Edit Resume"
        >
          <FiEdit2 className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
        <button
          onClick={() => onDownload(resume)}
          className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          title="Download PDF"
        >
          <FiDownload className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(resume)}
          className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-colors"
          title="Delete Resume"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
