import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Users,
  Zap,
  Loader2,
  Cross,
  Redo
} from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState('input'); // 'input', 'magic-link-sent'

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  // Trim and normalize email
  const normalizedEmail = email.trim().toLowerCase();
  
  if (!validateEmail(normalizedEmail)) {
    setError('Please enter a valid email address (name@company.com)');
    return;
  }

  // Only allow these two specific emails
  const allowedEmails = ['admin@company.com', 'user@company.com'];
  
  setLoading(true);

  // Simulate API call
  setTimeout(() => {
    // Check against allowed emails
    if (allowedEmails.includes(normalizedEmail)) {
      // Direct login for allowed emails
      onLogin(normalizedEmail);
    } else {
      setError(
        <div className="space-y-3">
          <div>
            <p className="font-medium">Email not authorized</p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-mono bg-red-100 px-2 py-1 rounded">{normalizedEmail}</span> is not in the allowlist.
            </p>
          </div>
 
        </div>
      );
    }
    setLoading(false);
  }, 1000);
};

const demoLogin = (demoEmail) => {
  const normalizedDemoEmail = demoEmail.toLowerCase();
  setEmail(normalizedDemoEmail);
  
  // Direct login for demo accounts without validation delay
  setLoading(true);
  setTimeout(() => {
    onLogin(normalizedDemoEmail);
    setLoading(false);
  }, 500);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo & Branding */}
          <div className="text-center mb-10">
           
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-700 bg-clip-text text-transparent mb-2">
              Audit AI
            </h1>
            <p className="text-gray-600 font-medium">
              Professional-grade audit transformation
            </p>
            <div className="mt-3 inline-flex items-center space-x-2 text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4" />
              <span>AI-Powered • Secure • Enterprise-Ready</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="card border border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden">
            {/* Gradient header */}
<div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 px-10 py-8 relative overflow-hidden">
  {/* Subtle pattern overlay */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
    <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
  </div>
  
  <div className="relative">
    <div className="flex items-center justify-between mb-2">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-primary-100 text-lg">
          Sign in to your Audit AI dashboard
        </p>
      </div>
      <div className="hidden sm:block">
        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="text-sm font-semibold text-white">v2.0</span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center text-sm text-primary-200 mt-4">
      <Shield className="w-4 h-4 mr-2" />
      <span>Enterprise-grade security with email allowlist</span>
    </div>
  </div>
</div>

            <div className="p-6">
              {step === 'input' ? (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input pl-10 border-gray-300 focus:border-primary-500 w-full focus:ring-primary-500"
                          placeholder="you@company.com"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-lg bg-red-50 border border-red-200 p-4 animate-fade-in">
                        <div className="flex">
                          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              Access Restricted
                            </h3>
                            <div className="mt-1 text-sm text-red-700">
                              {error}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
<button
  type="submit"
  disabled={loading || !email}
  className="relative w-full py-4 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
>
  {/* Shine effect */}
  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
  
  {/* Content */}
  <span className="relative flex items-center justify-center text-sm">
    {loading ? (
      <>
        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
        Verifying Access...
      </>
    ) : (
      <>
        Continue with Email
        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
      </>
    )}
  </span>
  
  {/* Bottom glow effect */}
  <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>
                  </form>
                  <br/>
                  {/* Demo Access */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Try with demo accounts
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setEmail('admin@company.com')}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors group">
                        <Shield className="w-4 h-4 text-primary-600 mr-2" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900">Admin</div>
                          <div className="text-xs text-gray-500">Full access</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setEmail('user@company.com')}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors group">
                        <Users className="w-4 h-4 text-emerald-600 mr-2" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900">User</div>
                          <div className="text-xs text-gray-500">Standard access</div>
                        </div>
                      </button>

                       <button
                        onClick={() => setEmail('test@company.com')}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors group">
                        <Redo className="w-4 h-4 text-emerald-600 mr-2" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900">UnAuthorized mail</div>
                          <div className="text-xs text-gray-500">No access</div>
                        </div>
                      </button>
                    </div>
                  </div>

                
                </>
              ) : (
                /* Magic Link Sent Screen */
                <div className="text-center py-4 animate-fade-in">
                  <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 mb-6">
                    <Mail className="h-12 w-12 text-emerald-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We sent a magic link to <span className="font-semibold text-primary-700">{email}</span>
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                      <span>Waiting for login confirmation...</span>
                    </div>
                    
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                      <CheckCircle className="w-5 h-5 inline-block mr-2 text-blue-600" />
                      Magic link expires in 15 minutes
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setStep('input')}
                    className="mt-6 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ← Use a different email
                  </button>
                </div>
              )}
            </div>        
          </div>
    
        </div>
      </div>

      {/* Add custom animations to tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;