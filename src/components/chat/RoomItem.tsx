import React from 'react';
import { MessageSquare } from 'lucide-react';
import { formatTime } from '../../utils/dateFormat';
import type { Contact } from '../../types/matrix';

interface RoomItemProps {
  room: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export default function RoomItem({ room, isSelected, onClick }: RoomItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
        isSelected
          ? 'bg-indigo-50 text-indigo-600'
          : 'hover:bg-gray-50 text-gray-700'
      }`}
    >
      {room.avatarUrl ? (
        <img
          src={room.avatarUrl}
          alt={room.name}
          className="w-12 h-12 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${room.name}`;
          }}
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <MessageSquare className="h-6 w-6 text-gray-400" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <p className="font-medium truncate">
            {room.name}
          </p>
          {room.timestamp && (
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatTime(room.timestamp)}
            </span>
          )}
        </div>
        {room.lastMessage && (
          <p className="text-sm text-gray-500 truncate">
            {room.lastMessage}
          </p>
        )}
      </div>
    </button>
  );
}