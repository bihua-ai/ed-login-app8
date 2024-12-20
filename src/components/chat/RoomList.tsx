import React from 'react';
import RoomItem from './RoomItem';
import type { Contact } from '../../types/matrix';

interface RoomListProps {
  rooms: Contact[];
  selectedId: string | null;
  onSelectRoom: (room: Contact) => void;
}

export default function RoomList({ rooms, selectedId, onSelectRoom }: RoomListProps) {
  return (
    <div className="space-y-1 p-2">
      {rooms.map((room) => (
        <RoomItem
          key={room.id}
          room={room}
          isSelected={selectedId === room.id}
          onClick={() => onSelectRoom(room)}
        />
      ))}
    </div>
  );
}