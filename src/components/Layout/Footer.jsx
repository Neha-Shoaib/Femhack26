import React from 'react';
import { FileText, Globe, MessageSquare, Shield, HelpCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#06080e] border-t border-slate-800/80 text-slate-400 text-xs py-4 px-4 sm:px-6 lg:px-8 shrink-0 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center">
            <FileText className="h-3 w-3 text-white" />
          </div>
          <span className="font-bold text-slate-200">CVCraft</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-500">
            © {currentYear} All rights reserved.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs">
          <a href="#privacy" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Privacy
          </a>
          <a href="#terms" className="hover:text-blue-400 transition-colors">
            Terms
          </a>
          <a href="#support" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <HelpCircle className="h-3 w-3" />
            Support
          </a>
          <a href="#feedback" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            Feedback
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;