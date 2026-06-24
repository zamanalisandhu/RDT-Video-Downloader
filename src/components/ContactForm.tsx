'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [state, setState] = useState<{
    submitting: boolean;
    succeeded: boolean;
    error: string | null;
  }>({
    submitting: false,
    succeeded: false,
    error: null
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ ...state, submitting: true, error: null });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('https://formspree.io/f/mqenzvyo', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setState({ submitting: false, succeeded: true, error: null });
        form.reset();
      } else {
        const result = await response.json();
        setState({ 
          submitting: false, 
          succeeded: false, 
          error: result.error || 'Submission failed. Please check your form and try again.' 
        });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setState({ 
        submitting: false, 
        succeeded: false, 
        error: 'Network error. Please check your connection and try again.' 
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ul className="space-y-8 list-none">
        <li className="flex items-start gap-4">
          <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
            <Mail className="text-brand-orange" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Email Us</h3>
            <p className="text-slate-600">support@rdtvideodownloader.com</p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
            <Clock className="text-brand-orange" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Response Time</h3>
            <p className="text-slate-600">We typically respond within 24-48 hours.</p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
            <MessageSquare className="text-brand-orange" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Feedback</h3>
            <p className="text-slate-600">Your feedback helps us make RDT Video Downloader better for everyone.</p>
          </div>
        </li>
      </ul>

      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
        {state.succeeded ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
            <p className="text-slate-600 mb-8">
              Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
            </p>
            <button 
              onClick={() => setState({ ...state, succeeded: false })}
              className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            action="https://formspree.io/f/mqenzvyo" 
            method="POST" 
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-brand-orange transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-brand-orange transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-brand-orange transition-colors resize-none"
                placeholder="How can we help?"
              />
            </div>
            
            {state.error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl">
                {state.error}
              </div>
            )}

            <button 
              type="submit"
              disabled={state.submitting}
              className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {state.submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
