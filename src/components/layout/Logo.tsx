import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img 
        src="/src/assets/bihua.png" 
        alt="笔画" 
        className="h-6 w-auto"
      />
      <span className="ml-2 text-lg font-semibold text-gray-900">教学辅助系统</span>
    </div>
  );
}