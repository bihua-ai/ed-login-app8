import React from 'react';
import { User } from 'lucide-react';

interface UsernameInputProps {
  value: string;
  server: string;
  onChange: (value: string) => void;
}

export default function UsernameInput({ value, server, onChange }: UsernameInputProps) {
  // Extract domain from server URL
  const serverDomain = server.replace(/^https?:\/\//, '').split('/')[0];
  
  return (
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        用户名
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="username"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="输入用户名"
        />
        {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-sm">:{serverDomain}</span>
        </div> */}
      </div>
    </div>
  );
}