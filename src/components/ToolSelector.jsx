import React from 'react';

const ToolSelector = ({ selectedTool, onToolChange }) => {
  return (
    <div className="tool-header">
      <div>
        <h2>Select AI Tool Mode</h2>
        <p className="text-gray">Choose between two transformation modes</p>
      </div>
      
      <div>
        <select 
          value={selectedTool} 
          onChange={(e) => onToolChange(e.target.value)}
          className="form-group"
          style={{ minWidth: '250px' }}
        >
          <option value="single">Mode 1: Single Finding Rewriter</option>
          <option value="executive">Mode 2: Executive Summary Generator</option>
        </select>
      </div>
    </div>
  );
};

export default ToolSelector;