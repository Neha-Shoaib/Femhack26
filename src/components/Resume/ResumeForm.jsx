import { useState } from 'react';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { generateId, skillCategories, languageProficiencyLevels, commonLanguages } from '../../utils/helpers';

const ResumeForm = ({ resumeData, onChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    education: true,
    skills: true,
    experience: true,
    projects: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updatePersonalInfo = (field, value) => {
    onChange({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const addEducation = () => {
    onChange({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: generateId(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateEducation = (id, field, value) => {
    onChange({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id) => {
    onChange({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    onChange({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: generateId(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateExperience = (id, field, value) => {
    onChange({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id) => {
    onChange({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addProject = () => {
    onChange({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          id: generateId(),
          name: '',
          description: '',
          technologies: '',
          link: '',
        },
      ],
    });
  };

  const updateProject = (id, field, value) => {
    onChange({
      ...resumeData,
      projects: resumeData.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id) => {
    onChange({
      ...resumeData,
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    });
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      onChange({
        ...resumeData,
        skills: [...resumeData.skills, skill],
      });
    }
  };

  const removeSkill = (skill) => {
    onChange({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    });
  };

  // Languages
  const addLanguage = () => {
    onChange({
      ...resumeData,
      languages: [
        ...resumeData.languages,
        {
          id: generateId(),
          name: '',
          proficiency: '',
        },
      ],
    });
  };

  const updateLanguage = (id, field, value) => {
    onChange({
      ...resumeData,
      languages: resumeData.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id) => {
    onChange({
      ...resumeData,
      languages: resumeData.languages.filter((lang) => lang.id !== id),
    });
  };

  const SectionHeader = ({ title, section }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-3 text-left"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      {expandedSections[section] ? (
        <FiChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <FiChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="card p-6">
        <SectionHeader title="Personal Information" section="personalInfo" />
        {expandedSections.personalInfo && (
          <div className="space-y-4 mt-4 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@example.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.address}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  placeholder="City, Country"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="https://github.com/johndoe"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Professional Summary
              </label>
              <textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="Write a brief summary of your professional background..."
                rows={4}
                className="input-field resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <FiPlus className="w-4 h-4" />
            Add Education
          </button>
        </div>
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className="mb-6 last:mb-0 p-4 bg-gray-50 dark:bg-dark-100 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Education #{index + 1}</span>
              {resumeData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="Institution Name"
                className="input-field"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Degree"
                className="input-field"
              />
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                placeholder="Field of Study"
                className="input-field"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  placeholder="Start Date"
                  className="input-field"
                />
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  placeholder="End Date"
                  className="input-field"
                />
              </div>
            </div>
            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              placeholder="Additional details (achievements, GPA, etc.)"
              rows={2}
              className="input-field resize-none mt-4"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {resumeData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-primary-900 dark:hover:text-primary-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="space-y-3">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{category.name}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    disabled={resumeData.skills.includes(skill)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      resumeData.skills.includes(skill)
                        ? 'bg-gray-200 dark:bg-dark-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Languages</h3>
          <button
            type="button"
            onClick={addLanguage}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <FiPlus className="w-4 h-4" />
            Add Language
          </button>
        </div>
        {resumeData.languages.map((lang, index) => (
          <div key={lang.id} className="mb-4 last:mb-0 p-4 bg-gray-50 dark:bg-dark-100 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Language #{index + 1}</span>
              {resumeData.languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Language
                </label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                  placeholder="e.g., English, Spanish"
                  list="common-languages"
                  className="input-field"
                />
                <datalist id="common-languages">
                  {commonLanguages.map((langName) => (
                    <option key={langName} value={langName} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Proficiency
                </label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select proficiency</option>
                  {languageProficiencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h3>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <FiPlus className="w-4 h-4" />
            Add Experience
          </button>
        </div>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="mb-6 last:mb-0 p-4 bg-gray-50 dark:bg-dark-100 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Experience #{index + 1}</span>
              {resumeData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="input-field"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                placeholder="Position Title"
                className="input-field"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  placeholder="Start Date"
                  className="input-field"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="End Date"
                  className="input-field"
                />
              </div>
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
              className="input-field resize-none mt-4"
            />
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
          <button
            type="button"
            onClick={addProject}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <FiPlus className="w-4 h-4" />
            Add Project
          </button>
        </div>
        {resumeData.projects.map((proj, index) => (
          <div key={proj.id} className="mb-6 last:mb-0 p-4 bg-gray-50 dark:bg-dark-100 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Project #{index + 1}</span>
              {resumeData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                placeholder="Project Name"
                className="input-field"
              />
              <input
                type="text"
                value={proj.technologies}
                onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                placeholder="Technologies Used"
                className="input-field"
              />
              <input
                type="url"
                value={proj.link}
                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                placeholder="Project URL"
                className="input-field"
              />
            </div>
            <textarea
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              placeholder="Describe the project, your role, and key achievements..."
              rows={4}
              className="input-field resize-none mt-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeForm;
