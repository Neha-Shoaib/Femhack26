const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-dark-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Resume Builder
            </span>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Resume Builder. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
