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
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

const AdminPanel = ({ users = [] }) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [showPaymentLink, setShowPaymentLink] = useState(false);
  const [filter, setFilter] = useState('all');
  const [actionMessage, setActionMessage] = useState(null);
  const [userList, setUserList] = useState([
    { id: 1, email: 'admin@company.com', status: 'active', role: 'admin', joined: '2024-01-15' },
    { id: 2, email: 'user@company.com', status: 'active', role: 'user', joined: '2024-01-16' },
    { id: 3, email: 'auditor@company.com', status: 'active', role: 'auditor', joined: '2024-01-17' },
    { id: 4, email: 'pending@company.com', status: 'pending', role: 'user', joined: '2024-01-18' },
    { id: 5, email: 'declined@other.com', status: 'declined', role: 'user', joined: '2024-01-19' }
  ]);

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

    const newUser = {
      id: userList.length + 1,
      email: newUserEmail,
      status: 'active',
      role: newUserRole,
      joined: new Date().toISOString().split('T')[0]
    };

    setUserList([...userList, newUser]);
    
    setActionMessage({
      type: 'success',
      text: `${newUserEmail} has been added to the allowlist`
    });
    
    setTimeout(() => setActionMessage(null), 3000);
    setNewUserEmail('');
    setNewUserRole('user');
  };

  const handleApproveUser = (id) => {
    setUserList(userList.map(user => 
      user.id === id ? { ...user, status: 'active' } : user
    ));
    
    const userEmail = userList.find(u => u.id === id)?.email;
    setActionMessage({
      type: 'success',
      text: `${userEmail} has been approved and added to allowlist`
    });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleDeclineUser = (id) => {
    const userEmail = userList.find(u => u.id === id)?.email;
    if (window.confirm(`Are you sure you want to decline ${userEmail}?`)) {
      setUserList(userList.map(user => 
        user.id === id ? { ...user, status: 'declined' } : user
      ));
      setActionMessage({
        type: 'error',
        text: `${userEmail} has been declined`
      });
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleRemoveUser = (id) => {
    const userEmail = userList.find(u => u.id === id)?.email;
    if (window.confirm(`Remove ${userEmail} from allowlist?`)) {
      setUserList(userList.filter(user => user.id !== id));
      setActionMessage({
        type: 'error',
        text: `${userEmail} has been removed from allowlist`
      });
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleEditUser = (id) => {
    const user = userList.find(u => u.id === id);
    const newEmail = prompt('Enter new email:', user.email);
    if (newEmail && newEmail !== user.email) {
      setUserList(userList.map(u => 
        u.id === id ? { ...u, email: newEmail } : u
      ));
      setActionMessage({
        type: 'success',
        text: `Email updated to ${newEmail}`
      });
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleChangeRole = (id, newRole) => {
    setUserList(userList.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    const userEmail = userList.find(u => u.id === id)?.email;
    setActionMessage({
      type: 'success',
      text: `${userEmail} role changed to ${newRole}`
    });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const filteredUsers = filter === 'all' 
    ? userList 
    : userList.filter(user => user.status === filter);

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
      case 'manager': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: userList.length,
    active: userList.filter(u => u.status === 'active').length,
    pending: userList.filter(u => u.status === 'pending').length,
    declined: userList.filter(u => u.status === 'declined').length
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
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
          <button 
            onClick={() => setUserList([...userList])}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
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
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600 mt-1">Across all statuses</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-emerald-700">Active</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
          <div className="text-sm text-gray-600 mt-1">Currently have access</div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-amber-700">Pending</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
          <div className="text-sm text-gray-600 mt-1">Awaiting approval</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-red-700">Declined</span>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.declined}</div>
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
        
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
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
                    onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="user">Standard User</option>
                  <option value="auditor">Auditor</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              User will be added with {newUserRole === 'admin' ? 'administrator' : newUserRole} access rights
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
      </div>

      {/* User List Section - Grid Layout */}
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
              <button
                onClick={() => setFilter('declined')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === 'declined' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Declined
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <div 
                key={user.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors group"
              >
                <div className="p-6">
                  {/* User Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-lg">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-gray-900">{user.email}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}>
                            {user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Declined'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            Joined {user.joined}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* User Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Status</div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          user.status === 'active' ? 'bg-emerald-500' : 
                          user.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-gray-900 capitalize">{user.status}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Role</div>
                      <div className="font-medium text-gray-900 capitalize">{user.role}</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Access</div>
                      <div className="font-medium text-gray-900">
                        {user.status === 'active' ? 'Full Access' : 'No Access'}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Member Since</div>
                      <div className="font-medium text-gray-900">{user.joined}</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleChangeRole(user.id, 'user')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          user.role === 'user' 
                            ? 'bg-gray-800 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        User
                      </button>
                      <button
                        onClick={() => handleChangeRole(user.id, 'auditor')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          user.role === 'auditor' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Auditor
                      </button>
                      <button
                        onClick={() => handleChangeRole(user.id, 'admin')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          user.role === 'admin' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {user.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApproveUser(user.id)}
                            className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center text-sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeclineUser(user.id)}
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </button>
                        </>
                      ) : user.status === 'active' ? (
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                        >
                          <UserMinus className="w-4 h-4 mr-2" />
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Admin Panel Notes</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Click on any user card to view detailed information</li>
              <li>• Use the role buttons to quickly change user permissions</li>
              <li>• Pending users require approval before they can access the system</li>
              <li>• All changes are automatically saved and logged</li>
              <li>• Export feature available for backup and audit purposes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;