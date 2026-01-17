import React, { useState } from 'react';
import ToolSelector from './ToolSelector';
import SingleFinding from './SingleFinding';
import ExecutiveSummary from './ExecutiveSummary';

const Dashboard = ({ userEmail, onLogout }) => {
  const [selectedTool, setSelectedTool] = useState('single');

  return (
    <div>
      <header className="header">
        <div>
          <h1>Audit AI Tool</h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Transform audit findings into executive-level insights
          </p>
        </div>
        <div className="user-info">
          <span>Welcome, {userEmail}</span>
          <button onClick={onLogout} className="btn btn-secondary" style={{ width: 'auto' }}>
            Logout
          </button>
        </div>
      </header>
       {userEmail === "admin@company.com" ? "" : <div className="container">
        <div className="tool-container">
          <ToolSelector selectedTool={selectedTool} onToolChange={setSelectedTool} />
          
          {selectedTool === 'single' ? (
            <SingleFinding />
          ) : (
            <ExecutiveSummary />
          )}
        </div>
      </div> }
      
    </div>
  );
};

export default Dashboard;