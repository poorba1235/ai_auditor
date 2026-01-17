import React, { useState } from 'react';

const AdminPanel = ({ users = [] }) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [showPaymentLink, setShowPaymentLink] = useState(false);

  // In a real app, these would be API calls
  const handleAddUser = () => {
    if (newUserEmail) {
      alert(`User ${newUserEmail} added to allowlist`);
      setNewUserEmail('');
    }
  };

  const handleRemoveUser = (email) => {
    if (confirm(`Remove ${email} from allowlist?`)) {
      alert(`User ${email} removed`);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin User Management</h2>
      <p className="text-gray mb-4">Manage user access via email allowlist</p>
      
      <div className="form-group" style={{ maxWidth: '400px' }}>
        <label>Add User to Allowlist</label>
        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="user@company.com"
        />
      </div>
      
      <div className="flex gap-4 mb-6">
        <button onClick={handleAddUser} className="btn" style={{ width: 'auto' }}>
          Add User
        </button>
        {/* <button 
          onClick={() => setShowPaymentLink(!showPaymentLink)} 
          className="btn btn-secondary" 
          style={{ width: 'auto' }}
        >
          Get Payment Link
        </button> */}
      </div>
      
      {/* {showPaymentLink && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="font-medium mb-2">Gumroad Payment Integration</p>
          <p className="text-sm text-gray mb-2">
            Direct users to this payment link to grant access:
          </p>
          <code className="bg-white p-2 rounded border block">
            https://gumroad.com/l/audit-ai-tool-access
          </code>
          <p className="text-sm text-gray mt-2">
            After payment, add their email to the allowlist above.
          </p>
        </div>
      )}
       */}
  <div>
  <h3 className="mb-2">Current Users ({users.length})</h3>
  <div className="user-list">
    {users.map((user, index) => (
      <div key={index} className="user-item">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{user}</span>
          {user === newUserEmail && (
            <span style={{
              padding: '2px 8px',
              fontSize: '0.75rem',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '4px',
              fontWeight: '500'
            }}>
              You
            </span>
          )}
        </div>
        <button 
          onClick={() => handleRemoveUser(user)}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '4px 12px',
            fontSize: '0.875rem',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: user === newUserEmail ? 0.5 : 1,
            pointerEvents: user === newUserEmail ? 'none' : 'auto'
          }}
          title={user === newUserEmail ? "Cannot remove your own account" : ""}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
</div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded border">
        <p className="font-medium mb-2">Note:</p>
        <p className="text-sm text-gray">
          This is a simple admin panel for demonstration. In production, 
          you would integrate with your external dashboard for full user management.
          Payments are handled externally via Gumroad.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;