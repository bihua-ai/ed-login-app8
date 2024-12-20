import React from 'react';
import PlatformGrid from './PlatformGrid';
import ReportSection from './ReportSection';

interface WelcomePageProps {
  onNavigate: (url: string) => void;
  onGenerateReport: () => void;
}

export default function WelcomePage({ onNavigate, onGenerateReport }: WelcomePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">欢迎使用教学辅助系统</h1>
      <PlatformGrid onNavigate={onNavigate} />
      <ReportSection onGenerateReport={onGenerateReport} />
    </div>
  );
}