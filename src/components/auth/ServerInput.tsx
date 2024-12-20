import React from 'react';
import { Server } from 'lucide-react';

interface ServerInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ServerInput({ value, onChange }: ServerInputProps) {
  return (
    <div>
      <label htmlFor="server" className="block text-sm font-medium text-gray-700">
        服务器地址
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Server className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="server"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}