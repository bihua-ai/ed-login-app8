import React from 'react';
import Logo from './layout/Logo';
import NavLinks from './navigation/NavLinks';
import ReportButton from './actions/ReportButton';

interface SidebarProps {
  onNavigate: (url: string) => void;
  onGenerateReport: () => void;
}

export default function Sidebar({ onNavigate, onGenerateReport }: SidebarProps) {
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* <div className="flex-shrink-0">
        <Logo />
      </div> */}
      
      <div className="flex-1 overflow-y-auto">
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <ReportButton onClick={onGenerateReport} />
      </div>
    </div>
  );
}