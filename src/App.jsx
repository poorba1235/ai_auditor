import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    // Check if user is admin (in real app, this would be from backend)
    setShowAdmin(email === 'admin@company.com');
  };

  const handleLogout = () => {
    setUserEmail('');
    setIsLoggedIn(false);
    setShowAdmin(false);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Dashboard userEmail={userEmail} onLogout={handleLogout} />
          {showAdmin && (
            <div className="container">
              <AdminPanel users={['user@company.com', 'auditor@company.com', 'admin@company.com']} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;