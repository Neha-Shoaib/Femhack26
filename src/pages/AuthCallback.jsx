import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  useEffect(() => {
    if (error) {
      // Show error and redirect to login
      setTimeout(() => {
        navigate('/login?error=' + encodeURIComponent(errorDescription || error));
      }, 3000);
    } else if (accessToken) {
      // Successfully authenticated, redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  }, [accessToken, error, errorDescription, navigate]);

  const isSuccess = !error && accessToken;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-300 dark:to-dark-200">
      <div className="text-center">
        {isSuccess ? (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-scale-in">
              <FiCheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Redirecting you to dashboard...
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center animate-scale-in">
              <FiXCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {errorDescription || error || 'Something went wrong'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Redirecting to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
