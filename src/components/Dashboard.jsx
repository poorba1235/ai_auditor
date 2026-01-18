import React, { useState } from 'react';
import { LogOut, User, Sparkles, BarChart3, Zap, Clock, Shield, FileText, FileStack } from 'lucide-react';
import ToolSelector from './ToolSelector';
import SingleFinding from './SingleFinding';
import ExecutiveSummary from './ExecutiveSummary';

const Dashboard = ({ userEmail, onLogout, isAdmin = false }) => {
  const [selectedTool, setSelectedTool] = useState('single');

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Audit AI Tool</h1>
                <p className="text-sm text-gray-600">
                  {isAdmin ? 'Admin Dashboard' : 'Executive-level audit transformation'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="p-1.5 bg-primary-100 rounded">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{userEmail}</div>
                  <div className="text-xs text-gray-500">
                    {isAdmin ? 'Administrator' : 'Standard User'}
                  </div>
                </div>
                {isAdmin && (
                  <div className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                    <Shield className="w-3 h-3 inline-block mr-1" />
                    Admin
                  </div>
                )}
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {userEmail === 'user@company.com' ? (
          <div className="max-w-6xl mx-auto">
            {/* Tool Introduction */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
               
               
              </div>

              <ToolSelector selectedTool={selectedTool} onToolChange={setSelectedTool} />
            </div>

            {/* Selected Tool */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl mr-4 ${
                  selectedTool === 'single' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {selectedTool === 'single' ? (
                    <FileText className="w-8 h-8" />
                  ) : (
                    <FileStack className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedTool === 'single' ? 'Single Finding Rewriter' : 'Executive Summary Generator'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedTool === 'single' 
                      ? 'Transform individual audit findings into senior-level language'
                      : 'Generate concise executive summaries from multiple findings'}
                  </p>
                </div>
              </div>

              {selectedTool === 'single' ? (
                <SingleFinding />
              ) : (
                <ExecutiveSummary />
              )}
            </div>

            {/* MVP Notice */}

          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Dashboard;