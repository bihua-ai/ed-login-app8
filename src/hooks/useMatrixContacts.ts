import { useState, useEffect, useMemo } from 'react';
import { MatrixClientUtil } from '../utils/matrixClient';
import { MATRIX_CONFIG } from '../config/api';
import type { Contact } from '../types/matrix';

export function useMatrixContacts(searchQuery: string = '') {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.lastMessage?.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  useEffect(() => {
    let mounted = true;

    const fetchRooms = async () => {
      try {
        const client = await MatrixClientUtil.initialize();
        
        // Wait for initial sync
        await new Promise<void>((resolve) => {
          const handleSync = (state: string) => {
            if (state === 'PREPARED') {
              client.removeListener('sync', handleSync);
              resolve();
            }
          };
          client.on('sync', handleSync);
        });

        if (!mounted) return;

        const rooms = client.getRooms();
        const roomContacts: Contact[] = [];

        // Process only rooms
        for (const room of rooms) {
          if (!room.name) continue;

          const lastEvent = room.timeline[room.timeline.length - 1];
          const avatarUrl = room.getAvatarUrl(
            MATRIX_CONFIG.homeserverUrl,
            96,
            96,
            'crop'
          );

          roomContacts.push({
            id: room.roomId,
            roomId: room.roomId,
            name: room.name,
            type: 'room',
            avatarUrl,
            lastMessage: lastEvent?.getContent()?.body,
            timestamp: lastEvent?.getTs(),
            memberCount: room.getJoinedMembers().length
          });
        }

        if (!mounted) return;

        // Sort rooms by most recent activity
        const sortedRooms = roomContacts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setContacts(sortedRooms);
        setError(null);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        if (mounted) {
          setError('无法加载聊天室列表');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    contacts: filteredContacts,
    loading,
    error,
    selectedId,
    setSelectedId
  };
}