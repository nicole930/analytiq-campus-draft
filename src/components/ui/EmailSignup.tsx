'use client';

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Send email to Formspree (free service that emails submissions to you)
      const response = await fetch('https://formspree.io/f/mkgqnova', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subject: 'New AnalytIQ Campus Early Access Signup',
          message: `New user signed up for early access: ${email}`,
          _replyto: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
      setMessage('Thanks for signing up! You\'ll be the first to know when we launch.');
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);

    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-100 border border-green-300 rounded-lg p-6 text-center">
        <div className="text-2xl mb-2">🎉</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">You're In!</h3>
        <p className="text-green-700">{message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-2">
          🚀 Get Early Access
        </h3>
        <p className="text-blue-100 text-sm">
          Be the first to draft your URI fantasy team when we launch!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Notify Me'
            )}
          </button>
        </div>

        {status === 'error' && (
          <p className="text-red-300 text-sm text-center">{message}</p>
        )}

        <div className="text-center">
          <p className="text-xs text-blue-200">
            💌 No spam, just launch updates • Unsubscribe anytime
          </p>
        </div>
      </form>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-blue-200">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span>URI students get priority access</span>
        </div>
      </div>
    </div>
  );
}