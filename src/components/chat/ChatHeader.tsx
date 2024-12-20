import React from 'react';
import { Contact } from '../../types/matrix';

interface ChatHeaderProps {
  selectedContact: Contact | null;
}

export default function ChatHeader({ selectedContact }: ChatHeaderProps) {
  return (
    <div className="p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        {selectedContact ? (
          <>
            {selectedContact.avatarUrl ? (
              <img
                src={selectedContact.avatarUrl}
                alt={selectedContact.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${selectedContact.name}`;
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">
                  {selectedContact.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h2 className="font-medium text-gray-900">
                {selectedContact.name}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedContact.memberCount ? `${selectedContact.memberCount} 位成员` : ''}
              </p>
            </div>
          </>
        ) : (
          <div>
            <h2 className="font-medium text-gray-900">
              聊天室
            </h2>
            <p className="text-xs text-gray-500">
              选择一个聊天室开始对话
            </p>
          </div>
        )}
      </div>
    </div>
  );
}