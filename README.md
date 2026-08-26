# Resume Builder - Modern & Secure Web Application

A professional, responsive Resume Builder web application built with React.js and Supabase. Create, edit, preview, and download professional resumes with ease.



## ✨ Features

### 🔐 Authentication & Security
- User Signup and Login with Supabase Authentication
- Email verification support
- Secure session handling
- Protected routes (Dashboard accessible only after login)
- User-specific data access using Supabase Row Level Security (RLS)

### 👤 User Workflow
- **Dashboard**: Overview of all your resumes with quick actions
- **Add Resume**: Create new resumes with a structured form
- **Edit Resume**: Modify existing resumes anytime
- **View Resume**: Live preview of your resume
- **Download PDF**: Generate professional PDF resumes

### 📝 Resume Sections
- Personal Information (Name, Email, Phone, Address, Links)
- Education Details (Multiple entries)
- Skills (Categorized suggestions)
- Work Experience (Multiple entries)
- Projects (With technologies and links)

### 🎨 User Interface
- Fully responsive design (Mobile, Tablet, Desktop)
- Clean, modern UI with Tailwind CSS
- Light & Dark theme support
- Smooth animations and transitions
- Toast notifications for user feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
cd resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Create the `resumes` table with the following schema:
```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  personal_info JSONB DEFAULT '{}',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  experience JSONB DEFAULT '[]',
  projects JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

3. Enable Row Level Security:
```sql
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can CRUD their own resumes" ON resumes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

4. Enable Email Verification in Supabase Authentication settings.

## 📁 Project Structure

```
resume-builder/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   └── Resume/
│   │       ├── ResumeForm.jsx
│   │       ├── ResumeCard.jsx
│   │       ├── ResumePreview.jsx
│   │       └── ResumeDownload.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AddResume.jsx
│   │   ├── EditResume.jsx
│   │   ├── ViewResume.jsx
│   │   └── AuthCallback.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   ├── supabaseClient.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── index.html
```

## 🛠️ Tech Stack

- **Frontend**: React.js, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API / Hooks
- **Backend**: Supabase (Authentication, Database)
- **PDF Generation**: html2pdf.js
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## 🎯 Key Features Explained

### Protected Routes
All dashboard and resume routes are protected and only accessible to authenticated users. Unauthenticated users are redirected to the login page.

### Real-time Preview
The resume form includes a live preview feature, allowing users to see how their resume will look in real-time as they fill in the details.

### PDF Download
One-click PDF download functionality with proper formatting and layout using html2pdf.js.

### Dark Mode
Seamless dark/light theme toggle with system preference detection and local storage persistence.

## 📝 API Reference

### Resume Operations

```javascript
// Create a new resume
await resumeOperations.createResume(userId, resumeData);

// Get all resumes for a user
await resumeOperations.getResumes(userId);

// Get a single resume
await resumeOperations.getResume(resumeId);

// Update a resume
await resumeOperations.updateResume(resumeId, resumeData);

// Delete a resume
await resumeOperations.deleteResume(resumeId);
```

## 🔒 Security Features

- Supabase Auth for secure authentication
- Row Level Security (RLS) for data isolation
- Protected routes
- Secure session handling
- Email verification support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the styling
- [React Icons](https://react-icons.github.io/react-icons/) for the icons
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for PDF generation

---

Built with ❤️ using React and Supabase
