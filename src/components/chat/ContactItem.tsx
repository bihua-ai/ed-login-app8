import React from 'react';
import { Users, MessageSquare } from 'lucide-react';
import type { Contact } from '../../types/matrix';
import { formatTime } from '../../utils/dateFormat';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export default function ContactItem({ contact, isSelected, onClick }: ContactItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${
        isSelected
          ? 'bg-indigo-50 text-indigo-600'
          : 'hover:bg-gray-50 text-gray-700'
      }`}
    >
      {contact.avatarUrl ? (
        <img
          src={contact.avatarUrl}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`;
          }}
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {contact.type === 'room' ? (
            <MessageSquare className="h-5 w-5 text-gray-400" />
          ) : (
            <Users className="h-5 w-5 text-gray-400" />
          )}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-medium truncate">
            {contact.name}
          </p>
          {contact.timestamp && (
            <span className="text-xs text-gray-500">
              {formatTime(contact.timestamp)}
            </span>
          )}
        </div>
        {contact.lastMessage && (
          <p className="text-xs text-gray-500 truncate">
            {contact.lastMessage}
          </p>
        )}
      </div>
    </button>
  );
}