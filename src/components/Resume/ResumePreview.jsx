import { FiExternalLink } from 'react-icons/fi';

const languageProficiencyLabels = {
  native: 'Native',
  fluent: 'Fluent',
  professional: 'Professional Working',
  limited: 'Limited Working',
  basic: 'Basic',
};

// Template configurations
const templateStyles = {
  modern: {
    headerBg: 'from-blue-500 to-blue-700',
    headerText: 'text-white',
    sectionTitle: 'text-gray-800 border-gray-300',
    itemTitle: 'text-gray-800',
    itemSubtitle: 'text-gray-600',
    description: 'text-gray-600',
  },
  classic: {
    headerBg: 'from-gray-700 to-gray-900',
    headerText: 'text-white',
    sectionTitle: 'text-gray-900 border-gray-400',
    itemTitle: 'text-gray-900',
    itemSubtitle: 'text-gray-700',
    description: 'text-gray-700',
  },
  creative: {
    headerBg: 'from-purple-500 to-pink-600',
    headerText: 'text-white',
    sectionTitle: 'text-purple-900 border-purple-300',
    itemTitle: 'text-purple-800',
    itemSubtitle: 'text-purple-600',
    description: 'text-purple-700',
  },
  minimal: {
    headerBg: 'from-gray-500 to-gray-700',
    headerText: 'text-white',
    sectionTitle: 'text-gray-800 border-gray-400',
    itemTitle: 'text-gray-800',
    itemSubtitle: 'text-gray-600',
    description: 'text-gray-600',
  },
  professional: {
    headerBg: 'from-slate-600 to-slate-800',
    headerText: 'text-white',
    sectionTitle: 'text-slate-800 border-slate-400',
    itemTitle: 'text-slate-800',
    itemSubtitle: 'text-slate-600',
    description: 'text-slate-700',
  },
};

const ResumePreview = ({ resumeData, template = 'modern' }) => {
  const { personalInfo, education, skills, experience, projects, languages } = resumeData;
  const styles = templateStyles[template] || templateStyles.modern;

  return (
    <div className="resume-preview mx-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${styles.headerBg} ${styles.headerText} p-8`}>
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg mb-4 opacity-90">
          {personalInfo.summary || 'Professional summary will appear here...'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.address}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-200 hover:text-white text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-200 hover:text-white text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-200 hover:text-white text-sm">
              <FiExternalLink className="w-4 h-4" />
              Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Education */}
        {education.length > 0 && education[0].institution && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${styles.sectionTitle} border-b-2 pb-2 mb-4`}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${styles.itemTitle}`}>{edu.institution}</h3>
                    <p className={styles.itemSubtitle}>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                  </div>
                  <span className="text-sm opacity-70">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className={`${styles.description} mt-2 text-sm`}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${styles.sectionTitle} border-b-2 pb-2 mb-4`}>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${styles.itemTitle}`}>{exp.position}</h3>
                    <p className={styles.itemSubtitle}>{exp.company}</p>
                  </div>
                  <span className="text-sm opacity-70">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className={`${styles.description} mt-2 text-sm whitespace-pre-line`}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && projects[0].name && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${styles.sectionTitle} border-b-2 pb-2 mb-4`}>
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4 p-3 bg-gray-50 dark:bg-dark-100 rounded-xl">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <h3 className={`font-semibold ${styles.itemTitle}`}>{proj.name}</h3>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm hover:underline font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{proj.technologies}</p>
                )}
                {proj.description && (
                  <p className={`${styles.description} mt-2 text-sm whitespace-pre-line`}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${styles.sectionTitle} border-b-2 pb-2 mb-4`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && languages[0].name && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${styles.sectionTitle} border-b-2 pb-2 mb-4`}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  className="px-3 py-1 bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {lang.name} ({languageProficiencyLabels[lang.proficiency] || lang.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
