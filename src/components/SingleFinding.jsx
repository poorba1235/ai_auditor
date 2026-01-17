import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const SingleFinding = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSeniorLevel = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const sampleOutput = `Senior Management Briefing

Critical Finding: Inadequate access controls on financial reporting systems have resulted in unauthorized personnel having the ability to modify financial records without proper oversight.

Business Impact:
• Financial statement integrity compromised
• Increased risk of fraudulent activity
• Potential regulatory non-compliance
• Reputational damage estimated at $2-5M

Strategic Recommendation:
Immediately implement role-based access controls with quarterly reviews, and establish automated monitoring for anomalous activities.

Decision Required:
Approve additional $150K for enhanced security infrastructure and dedicate 2 FTE resources for ongoing monitoring.`;
      
      setOutput(sampleOutput);
      setLoading(false);
    }, 1500);
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
                text: "Senior-Level Audit Finding",
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
    saveAs(blob, "audit_finding.docx");
  };

  return (
    <div>
      <div className="form-group">
        <label>Enter Audit Finding Details</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-area"
          placeholder="Paste your audit finding here. Include details about the issue, current controls, and any relevant context..."
          rows={6}
        />
      </div>

      <div className="flex justify-end gap-4 mb-4">
        <button 
          onClick={generateSeniorLevel} 
          className="btn"
          disabled={!input.trim() || loading}
        >
          {loading ? 'Processing...' : 'Generate Senior-Level Version'}
        </button>
      </div>

      {output && (
        <div className="output-container">
          <div className="output-header">
            <h3>AI-Generated Senior-Level Output</h3>
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

export default SingleFinding;