'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const n8nUrl = process.env.N8N_URL;
    const workflowId = process.env.N8N_WORKFLOW_ID;

    if (!n8nUrl || !workflowId) {
      setStatus('error');
      setMessage('API URL is not configured.');
      return;
    }

    const apiUrl = `${n8nUrl}/webhook/${workflowId}`;

    try {
      console.log('POST URL:', apiUrl);
      console.log('POST body:', JSON.stringify(formData, null, 2));
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! Your information has been submitted.');
        setFormData({ firstName: '', lastName: '', email: '', consent: false });
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-center">Contact Us</h1>
              
              {status === 'success' && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              
              {status === 'error' && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="consent">
                    I consent to having this website store my submitted information.
                  </label>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
