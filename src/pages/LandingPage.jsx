import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Star,
  Eye
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick navigation helper
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] h-[360px] bg-blue-600/15 blur-[110px] rounded-full" />
        <div className="absolute top-[35%] -left-28 w-[380px] h-[380px] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-[420px] h-[420px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ===================== NAVBAR ===================== */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#090D16]/80 border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Brand Logo */}
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavigate('/')}>
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/25 ring-1 ring-white/20">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                  CV<span className="text-blue-500">Craft</span>
                </span>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
                <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                <a href="#templates" className="hover:text-blue-400 transition-colors">Templates</a>
                <a href="#guide" className="hover:text-blue-400 transition-colors">How It Works</a>
                <a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-3.5">
                <button
                  onClick={() => handleNavigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavigate('/signup')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]"
                >
                  Create Free Account
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-b border-slate-800 bg-[#0c1220]/95 backdrop-blur-2xl px-5 pt-3 pb-5 space-y-3.5">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-blue-400 font-medium text-sm py-1"
              >
                Features
              </a>
              <a 
                href="#templates" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-blue-400 font-medium text-sm py-1"
              >
                Templates
              </a>
              <a 
                href="#guide" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-blue-400 font-medium text-sm py-1"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-blue-400 font-medium text-sm py-1"
              >
                Reviews
              </a>
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
                <button
                  onClick={() => handleNavigate('/login')}
                  className="w-full py-2 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-800 text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavigate('/signup')}
                  className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 shadow-md shadow-blue-600/30 text-center"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* ===================== HERO SECTION ===================== */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Smart Resume Builder for Modern Job Seekers</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.2]">
              Land Interviews Faster with <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                ATS-Optimized Resumes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Create professional, recruiter-ready resumes in minutes. Choose polished templates, customize effortlessly, and download pixel-perfect PDFs ready for top ATS platforms.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => handleNavigate('/signup')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Build Your Resume Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#templates"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4 text-slate-400" />
                <span>Explore Templates</span>
              </a>
            </div>

            {/* Key Value Points */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>100% ATS Compatible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Instant PDF Export</span>
              </div>
            </div>

            {/* App Preview Mockup */}
            <div className="mt-12 relative max-w-4xl mx-auto">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-slate-700/50 via-slate-800/30 to-blue-950/40 border border-slate-700/60 shadow-xl shadow-black/80">
                <div className="bg-[#0b111e] rounded-lg overflow-hidden border border-slate-800">
                  {/* Mock Window Topbar */}
                  <div className="px-4 py-2.5 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">Resume Editor - Live Preview</span>
                    </div>
                    <div className="text-xs bg-blue-500/20 text-blue-300 font-medium px-2.5 py-0.5 rounded-full border border-blue-500/30">
                      Real-time Auto-Save
                    </div>
                  </div>

                  {/* Mock Editor Body */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
                    {/* Left Form Preview */}
                    <div className="lg:col-span-5 space-y-3.5 text-left hidden sm:block">
                      <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Personal Details</div>
                        <div className="h-7 bg-slate-800/80 rounded mb-2 w-3/4 animate-pulse" />
                        <div className="h-7 bg-slate-800/80 rounded w-full animate-pulse" />
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Work Experience</div>
                        <div className="h-12 bg-slate-800/80 rounded mb-2 w-full animate-pulse" />
                      </div>
                    </div>

                    {/* Right Document Preview */}
                    <div className="lg:col-span-7 bg-white text-slate-900 rounded-lg p-5 sm:p-6 shadow-inner text-left font-sans">
                      <div className="border-b-2 border-slate-900 pb-2.5 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">ALEX MORGAN</h3>
                        <p className="text-xs font-semibold text-blue-700 tracking-wide mt-0.5">SENIOR FULL STACK ENGINEER</p>
                        <p className="text-[11px] text-slate-500 mt-1">alex.morgan@email.com • +1 (555) 019-2834 • San Francisco, CA</p>
                      </div>
                      
                      <div className="space-y-2.5">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-1 uppercase">Professional Summary</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Versatile software engineer with 5+ years of experience crafting scalable web apps using React, Node.js, and modern cloud architectures. Reduced system latency by 35% in previous roles.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-1 uppercase">Experience</h4>
                          <div className="text-[11px]">
                            <div className="flex justify-between font-semibold text-slate-800">
                              <span>Lead Frontend Developer - TechCorp</span>
                              <span className="text-slate-500 font-normal">2023 - Present</span>
                            </div>
                            <p className="text-slate-600 mt-0.5">• Engineered high-conversion user dashboards supporting 100k+ daily active users.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== FEATURES SECTION ===================== */}
        <section id="features" className="py-16 bg-[#070a12] border-t border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">Engineered For Success</h2>
              <p className="mt-2.5 text-2xl sm:text-3xl font-bold text-white">
                Everything you need to craft high-impact resumes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 hover:border-blue-500/40 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">ATS-Friendly Layouts</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Our formatting adheres to Applicant Tracking System standards so your qualifications get right into the recruiter's hands.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 hover:border-blue-500/40 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Live Dynamic Preview</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  See instant updates as you type. Adjust styling, reorder sections, and refine your copy in a single unified workspace.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 hover:border-blue-500/40 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">High-Resolution Export</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Download crisp vector PDFs ready for online submission, printing, and digital sharing across all major platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== HOW IT WORKS / GUIDE ===================== */}
        <section id="guide" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">Simple 3-Step Guide</h2>
              <p className="mt-2.5 text-2xl sm:text-3xl font-bold text-white">
                How to build your resume in under 5 minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4 shadow-md shadow-blue-600/30">
                  1
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Pick a Template</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Select a professionally crafted template tailored to your specific industry and career level.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4 shadow-md shadow-blue-600/30">
                  2
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Fill In Your Details</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Add your experience, skills, education, and achievements using our structured intuitive form fields.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4 shadow-md shadow-blue-600/30">
                  3
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Download & Apply</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Export your completed PDF with a single click and send out job applications with total confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== TEMPLATES PREVIEW ===================== */}
        <section id="templates" className="py-16 bg-[#070a12] border-t border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">Designed For Every Career</h2>
              <p className="mt-2.5 text-2xl sm:text-3xl font-bold text-white">
                Choose from recruiter-approved templates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Template Card 1 */}
              <div className="group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className="h-56 bg-slate-800/60 p-5 flex flex-col justify-between border-b border-slate-800 relative">
                  <div className="space-y-2">
                    <div className="h-2.5 w-1/3 bg-blue-500/40 rounded" />
                    <div className="h-2 w-full bg-slate-700/50 rounded" />
                    <div className="h-2 w-4/5 bg-slate-700/50 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-700/40 rounded" />
                    <div className="h-2 w-2/3 bg-slate-700/40 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleNavigate('/signup')}
                      className="px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="text-white font-bold text-sm">The Modern Minimalist</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Clean, standard design great for tech and software roles.</p>
                </div>
              </div>

              {/* Template Card 2 */}
              <div className="group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className="h-56 bg-slate-800/60 p-5 flex flex-col justify-between border-b border-slate-800 relative">
                  <div className="flex gap-3.5">
                    <div className="w-1/3 space-y-2">
                      <div className="h-2.5 w-full bg-indigo-500/40 rounded" />
                      <div className="h-2 w-full bg-slate-700/50 rounded" />
                    </div>
                    <div className="w-2/3 space-y-2">
                      <div className="h-2.5 w-3/4 bg-slate-700/60 rounded" />
                      <div className="h-2 w-full bg-slate-700/50 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-700/40 rounded" />
                    <div className="h-2 w-3/4 bg-slate-700/40 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleNavigate('/signup')}
                      className="px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="text-white font-bold text-sm">Executive Two-Column</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Organized layout highlighting skills and leadership experience.</p>
                </div>
              </div>

              {/* Template Card 3 */}
              <div className="group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className="h-56 bg-slate-800/60 p-5 flex flex-col justify-between border-b border-slate-800 relative">
                  <div className="space-y-2.5">
                    <div className="h-3 w-1/2 bg-sky-500/40 rounded" />
                    <div className="h-2 w-full bg-slate-700/50 rounded" />
                    <div className="h-2 w-5/6 bg-slate-700/50 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-700/40 rounded" />
                    <div className="h-2 w-1/2 bg-slate-700/40 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleNavigate('/signup')}
                      className="px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="text-white font-bold text-sm">Classic Corporate</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Timeless structure preferred by traditional industries and finance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section id="testimonials" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">User Feedback</h2>
              <p className="mt-2.5 text-2xl sm:text-3xl font-bold text-white">
                Trusted by job seekers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "I restructured my resume using this tool and received 3 interview callbacks within one week. The ATS formatting is spot on."
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 font-medium">
                  Sarah K. • Frontend Engineer
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "Super easy to use. No complicated Word docs that break layout whenever you add a line. Highly recommended!"
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 font-medium">
                  David M. • Product Designer
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "The dark theme dashboard and clean export are unmatched. Landed a job at a top tech startup with my generated resume."
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 font-medium">
                  Emily R. • Data Analyst
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CALL TO ACTION ===================== */}
        <section className="py-16 bg-gradient-to-b from-[#070a12] to-[#0a1020] border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to create your winning resume?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
              Join thousands of professionals landing jobs at leading companies. It takes less than 5 minutes.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handleNavigate('/signup')}
                className="px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-95"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="border-t border-slate-800/80 bg-[#06080e] py-8 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center">
                <FileText className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-300 text-sm">CVCraft</span>
              <span>© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Contact Support</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}