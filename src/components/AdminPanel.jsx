import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Mail, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  ExternalLink,
  MoreVertical
} from 'lucide-react';

const AdminPanel = ({ users = [] }) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [showPaymentLink, setShowPaymentLink] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'pending', 'declined'
  const [actionMessage, setActionMessage] = useState(null);

  // Mock user data with status
  const mockUsers = [
    { email: 'admin@company.com', status: 'active', role: 'admin', joined: '2024-01-15' },
    { email: 'user@company.com', status: 'active', role: 'user', joined: '2024-01-16' },
    { email: 'auditor@company.com', status: 'active', role: 'auditor', joined: '2024-01-17' },
    { email: 'pending@company.com', status: 'pending', role: 'user', joined: '2024-01-18' },
    { email: 'declined@other.com', status: 'declined', role: 'user', joined: '2024-01-19' }
  ];

  const handleAddUser = () => {
    if (!newUserEmail.trim()) {
      setActionMessage({
        type: 'error',
        text: 'Please enter an email address'
      });
      return;
    }

    if (!newUserEmail.includes('@')) {
      setActionMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      return;
    }

    // In production, this would be an API call
    setActionMessage({
      type: 'success',
      text: `${newUserEmail} has been added to the allowlist`
    });
    
    setTimeout(() => setActionMessage(null), 3000);
    setNewUserEmail('');
  };

  const handleApproveUser = (email) => {
    setActionMessage({
      type: 'success',
      text: `${email} has been approved and added to allowlist`
    });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleDeclineUser = (email) => {
    if (window.confirm(`Are you sure you want to decline ${email}?`)) {
      setActionMessage({
        type: 'error',
        text: `${email} has been declined`
      });
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleRemoveUser = (email) => {
    if (window.confirm(`Remove ${email} from allowlist?`)) {
      setActionMessage({
        type: 'error',
        text: `${email} has been removed from allowlist`
      });
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const filteredUsers = filter === 'all' 
    ? mockUsers 
    : mockUsers.filter(user => user.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'auditor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border -mt-20 border-gray-200 p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
        <div>
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary-100 rounded-xl mr-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-600 mt-1">Manage user access via email allowlist</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary-700">Total Users</span>
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">5</div>
          <div className="text-sm text-gray-600 mt-1">Across all statuses</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-emerald-700">Active</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600 mt-1">Currently have access</div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-amber-700">Pending</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">1</div>
          <div className="text-sm text-gray-600 mt-1">Awaiting approval</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-red-700">Declined</span>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">1</div>
          <div className="text-sm text-gray-600 mt-1">Access requests denied</div>
        </div>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <div className={`mb-8 p-4 rounded-xl border ${
          actionMessage.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center">
            {actionMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mr-3" />
            )}
            <span className={`font-medium ${
              actionMessage.type === 'success' ? 'text-emerald-800' : 'text-red-800'
            }`}>
              {actionMessage.text}
            </span>
          </div>
        </div>
      )}

      {/* Add User Section */}
      <div className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-primary-600" />
          Add User to Allowlist
        </h3>
        
      <div className="flex items-end gap-4">
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Email Address
    </label>
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="email"
        value={newUserEmail}
        onChange={(e) => setNewUserEmail(e.target.value)}
        placeholder="newuser@company.com"
        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
    <p className="mt-2 text-xs text-gray-500">
      User will be added with standard access rights
    </p>
  </div>
  
  <div className="flex flex-col gap-2">
    <button
      onClick={handleAddUser}
      className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center min-w-[120px] h-[42px]"
    >
      <UserPlus className="w-5 h-5 mr-2" />
      Add User
    </button>
    
    <p className="text-xs text-gray-500 text-center whitespace-nowrap">
      Press Enter or click Add
    </p>
  </div>
</div>
        {showPaymentLink && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium text-blue-800 mb-2">External Payment Integration</p>
            <div className="flex items-center justify-between">
              <code className="text-sm text-blue-700 bg-white px-3 py-2 rounded border flex-1 mr-4">
                https://gumroad.com/l/audit-ai-tool-access
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText('https://gumroad.com/l/audit-ai-tool-access')}
                className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200 transition-colors text-sm"
              >
                Copy Link
              </button>
            </div>
            <p className="text-sm text-blue-600 mt-3">
              Users will be automatically added to pending requests after payment
            </p>
          </div>
        )}
      </div>

      {/* User List Section */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">User Allowlist</h3>
            <p className="text-gray-600">Manage access permissions and status</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === 'all' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === 'active' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === 'pending' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending
              </button>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select 
                className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="pending">Pending Only</option>
                <option value="declined">Declined Only</option>
              </select>
            </div>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No users found</h4>
            <p className="text-gray-600">No users match the current filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <div 
                key={index}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors group"
              >
                <div className="flex items-start lg:items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">{user.email}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending Approval' : 'Declined'}
                      </span>
                      {user.role === 'admin' && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Joined {user.joined}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        <span className="capitalize">{user.role} role</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {user.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveUser(user.email)}
                        className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeclineUser(user.email)}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </button>
                    </>
                  ) : user.status === 'active' ? (
                    <>
                      <button
                        onClick={() => handleRemoveUser(user.email)}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                      >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Remove
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRemoveUser(user.email)}
                      className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center text-sm"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
    
    </div>
  );
};

export default AdminPanel;