const languageProficiencyLabels = {
  native: 'Native',
  fluent: 'Fluent',
  professional: 'Professional Working',
  limited: 'Limited Working',
  basic: 'Basic',
};

const ResumePreview = ({ resumeData }) => {
  const { personalInfo, education, skills, experience, projects, languages } = resumeData;

  return (
    <div className="resume-preview mx-auto transform scale-95 origin-top">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          {personalInfo.summary || 'Professional summary will appear here...'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
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
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              GitHub
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Education */}
        {education.length > 0 && education[0].institution && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                    <p className="text-gray-600">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && projects[0].name && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      View Project
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="text-gray-500 text-sm">{proj.technologies}</p>
                )}
                {proj.description && (
                  <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
