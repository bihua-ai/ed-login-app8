import React from 'react';
import WelcomePage from './welcome/WelcomePage';
import ExternalPage from './ExternalPage';
import { MainAreaState } from '../types/navigation';

interface MainAreaProps {
  state: MainAreaState;
}

export default function MainArea({ state }: MainAreaProps) {
  const handleNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGenerateReport = () => {
    // Handle report generation
    console.log('Generating report...');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-auto">
        {state.type === 'welcome' && (
          <WelcomePage 
            onNavigate={handleNavigate}
            onGenerateReport={handleGenerateReport}
          />
        )}
        
        {state.type === 'external' && state.url && (
          <ExternalPage url={state.url} />
        )}
        
        {state.type === 'report' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900">达成度报告</h2>
            {/* Report content will go here */}
          </div>
        )}
      </div>
    </div>
  );
}