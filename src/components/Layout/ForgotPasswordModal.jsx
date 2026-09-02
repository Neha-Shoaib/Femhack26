import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
try{
   const handleForgotPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    // This tells Supabase EXACTLY where to send the user when they click the email link
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    alert('Error sending reset email: ' + error.message);
  } else {
    alert('Password reset link sent! Please check your inbox.');
  }
};
      setEmail('');
}

    catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0e1626] border border-slate-800 p-6 shadow-2xl text-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Reset Your Password</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-5">
          Enter the email associated with your account and we will send you a link to reset your password.
        </p>

        {status.message && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs ${
              status.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleResetRequest} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="px-4 py-2 text-xs rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium transition-colors"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}