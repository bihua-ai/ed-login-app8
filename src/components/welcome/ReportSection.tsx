import React from 'react';
import { FileText } from 'lucide-react';

interface ReportSectionProps {
  onGenerateReport: () => void;
}

export default function ReportSection({ onGenerateReport }: ReportSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">达成度报告</h2>
          <p className="text-gray-500 mt-1">
            生成详细的教学达成度分析报告，帮助评估教学效果
          </p>
        </div>
        <button
          onClick={onGenerateReport}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <FileText className="w-4 h-4" />
          生成报告
        </button>
      </div>
    </div>
  );
}