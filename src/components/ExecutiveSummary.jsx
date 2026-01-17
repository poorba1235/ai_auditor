import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const ExecutiveSummary = () => {
  const [inputs, setInputs] = useState(['', '', '']);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const addInputField = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const generateSummary = async () => {
    const validInputs = inputs.filter(input => input.trim());
    if (validInputs.length === 0) return;
    
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const sampleOutput = `EXECUTIVE SUMMARY - AUDIT QUARTERLY REVIEW

Key Themes Identified:
1. Control Gaps in Financial Systems
   - 3 findings related to access management
   - 2 incidents of unauthorized data modification
   - Estimated risk exposure: High ($2-5M)

2. Operational Efficiency Issues
   - Redundant processes identified across 4 departments
   - Average process improvement potential: 35% time savings

3. Compliance Concerns
   - 2 regulatory gaps requiring immediate attention
   - Deadline for remediation: Q3 2024

Top 3 Priorities:
1. Implement enhanced access controls (Timeline: 30 days)
2. Streamline financial reporting process (Timeline: 60 days)
3. Address regulatory gaps (Timeline: 45 days)

Overall Risk Assessment: MEDIUM
Recommended Executive Actions:
• Approve $250K budget for control enhancements
• Establish cross-functional remediation team
• Schedule board update in 60 days`;
      
      setOutput(sampleOutput);
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  const exportToWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Executive Audit Summary",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: output,
                size: 24,
              }),
            ],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "executive_summary.docx");
  };

  return (
    <div>
      <div className="form-group">
        <label>Enter Multiple Audit Findings (One per box)</label>
        {inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="text-area"
              placeholder={`Audit Finding #${index + 1} - Describe the finding, impact, and current state...`}
              rows={4}
            />
          </div>
        ))}
        
        <button onClick={addInputField} className="btn btn-secondary">
          + Add Another Finding
        </button>
      </div>

      <div className="flex justify-end gap-4 mb-4">
        <button 
          onClick={generateSummary} 
          className="btn"
          disabled={inputs.filter(i => i.trim()).length === 0 || loading}
        >
          {loading ? 'Generating Summary...' : 'Generate Executive Summary'}
        </button>
      </div>

      {output && (
        <div className="output-container">
          <div className="output-header">
            <h3>AI-Generated Executive Summary</h3>
            <div className="output-actions">
              <button onClick={copyToClipboard} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                Copy
              </button>
              <button onClick={exportToWord} className="btn btn-success" style={{ padding: '0.5rem 1rem' }}>
                Export to Word
              </button>
            </div>
          </div>
          <div className="output-area">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;