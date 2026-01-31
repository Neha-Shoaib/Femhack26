// Format date for display
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Download blob as file
export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Initial empty resume structure
export const initialResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [
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
  skills: [],
  experience: [
    {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  projects: [
    {
      id: generateId(),
      name: '',
      description: '',
      technologies: '',
      link: '',
    },
  ],
  languages: [
    {
      id: generateId(),
      name: '',
      proficiency: '',
    },
  ],
};

// Language suggestions
export const languageProficiencyLevels = [
  { value: 'native', label: 'Native' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'professional', label: 'Professional Working' },
  { value: 'limited', label: 'Limited Working' },
  { value: 'basic', label: 'Basic' },
];

export const commonLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Portuguese', 'Arabic', 'Hindi',
  'Russian', 'Italian', 'Dutch', 'Polish', 'Turkish', 'Vietnamese', 'Thai', 'Indonesian', 'Malay', 'Urdu'
];
export const skillCategories = [
  {
    name: 'Programming Languages',
    skills: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'TypeScript'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'SASS', 'Tailwind CSS', 'Bootstrap', 'jQuery'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails', 'ASP.NET', 'FastAPI'],
  },
  {
    name: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'SQLite', 'Oracle'],
  },
  {
    name: 'DevOps & Tools',
    skills: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform'],
  },
  {
    name: 'Other',
    skills: ['REST API', 'GraphQL', 'Agile', 'Scrum', 'Machine Learning', 'Data Analysis'],
  },
];
