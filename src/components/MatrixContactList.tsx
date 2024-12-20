import React from 'react';
import RoomList from './chat/RoomList';
import { useMatrixContacts } from '../hooks/useMatrixContacts';
import type { Contact } from '../types/matrix';

interface MatrixContactListProps {
  onSelectContact: (contact: Contact) => void;
  searchQuery: string;
}

export default function MatrixContactList({ onSelectContact, searchQuery }: MatrixContactListProps) {
  const { contacts, loading, error, selectedId, setSelectedId } = useMatrixContacts(searchQuery);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (contacts.length === 0 && searchQuery) {
    return (
      <div className="p-4 text-center text-gray-500">
        未找到匹配的聊天室
      </div>
    );
  }

  const handleRoomSelect = (room: Contact) => {
    setSelectedId(room.id);
    onSelectContact(room);
  };

  return (
    <div className="h-full overflow-y-auto">
      <RoomList
        rooms={contacts}
        selectedId={selectedId}
        onSelectRoom={handleRoomSelect}
      />
    </div>
  );
}