import React from 'react';
import { User, MessageSquare, BookOpen } from 'lucide-react';
import { useMatrixClient } from '../../hooks/useMatrixClient';
import LogoutButton from './LogoutButton';

interface NavBarProps {
  activeView: 'chat' | 'tools';
  onViewChange: (view: 'chat' | 'tools') => void;
}

export default function NavBar({ activeView, onViewChange }: NavBarProps) {
  const { profile } = useMatrixClient();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-50">
      <div className="mb-8">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.displayname || 'User'}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.displayname || 'User'}`;
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
        )}
      </div>

      <nav className="flex-1 flex flex-col items-center gap-4">
        <button
          onClick={() => onViewChange('chat')}
          className={`p-3 rounded-lg transition-colors ${
            activeView === 'chat'
              ? 'bg-indigo-100 text-indigo-600'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          title="聊天"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <button
          onClick={() => onViewChange('tools')}
          className={`p-3 rounded-lg transition-colors ${
            activeView === 'tools'
              ? 'bg-indigo-100 text-indigo-600'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          title="教学工具"
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
}