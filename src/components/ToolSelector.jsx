import React from 'react';
import { FileText, FileStack, Shield, BarChart3, Lock, Zap } from 'lucide-react';

const ToolSelector = ({ selectedTool, onToolChange }) => {
  const tools = [
    {
      id: 'single',
      name: 'Single Finding Rewriter',
      description: 'Transform individual findings into senior-level language',
      icon: FileText,
      status: 'active',
      color: 'primary'
    },
    {
      id: 'executive',
      name: 'Executive Summary Generator',
      description: 'Generate concise summaries from multiple findings',
      icon: FileStack,
      status: 'active',
      color: 'emerald'
    },
    {
      id: 'risk',
      name: 'Risk Scoring & Prioritization',
      description: 'Automated risk assessment and scoring framework',
      icon: BarChart3,
      status: 'coming-soon',
      color: 'blue'
    },
    {
      id: 'compliance',
      name: 'Compliance Mapping',
      description: 'Map findings to regulatory frameworks',
      icon: Shield,
      status: 'coming-soon',
      color: 'purple'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Transformation Modes</h2>
          <p className="text-gray-600 mt-1">Select a tool to transform your audit findings</p>
        </div>
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.status === 'active';
          const isSelected = selectedTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => isActive && onToolChange(tool.id)}
              className={`p-5 rounded-xl border-2 transition-all duration-200 text-left group ${
                isSelected
                  ? `border-${tool.color}-500 bg-${tool.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              } ${
                !isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
              }`}
              disabled={!isActive}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isActive 
                      ? `bg-${tool.color}-100 text-${tool.color}-600`
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className={`font-semibold ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {tool.name}
                      </span>
                      {!isActive && (
                        <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                    
                    {isSelected && isActive && (
                      <div className="mt-3 flex items-center text-sm text-primary-600">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mr-2"></div>
                        Currently selected
                      </div>
                    )}
                  </div>
                </div>
                
                {!isActive && (
                  <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode Status */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
            <span className="text-gray-700">Active mode</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-gray-500">Coming soon</span>
          </div>
        </div>
        <div className="text-gray-500">
          MVP: 2 of 4 modes available
        </div>
      </div>
    </div>
  );
};

export default ToolSelector;