import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call to check email against allowlist
    setTimeout(() => {
      // In production, this would be an actual API call
      const allowedEmails = [
        'admin@company.com',
        'user@company.com',
        'auditor@company.com'
      ];
      
      if (allowedEmails.includes(email.toLowerCase())) {
        onLogin(email);
      } else {
        setError('Email not authorized. Please contact administrator.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Audit AI Tool Login</h2>
        <p className="text-center text-gray mb-4">
          Enter your email to access the tool
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>
          
          {error && (
            <div className="text-center" style={{ color: '#dc2626', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Checking access...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray">
         <p>admin@company.com -admin , user@company.com - user </p>
        </div>
      </div>
    </div>
  );
};

export default Login;