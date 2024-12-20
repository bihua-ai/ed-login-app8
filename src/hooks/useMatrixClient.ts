import { useState, useEffect } from 'react';
import { MatrixClientUtil } from '../utils/matrixClient';

interface Profile {
  avatar_url?: string;
  displayname?: string;
}

interface Room {
  name: string;
  avatarUrl?: string;
  memberCount?: number;
}

export function useMatrixClient() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const client = await MatrixClientUtil.initialize();
        const userProfile = await client.getProfileInfo(client.getUserId());
        
        if (userProfile.avatar_url) {
          userProfile.avatar_url = client.mxcUrlToHttp(
            userProfile.avatar_url,
            96,
            96,
            'crop'
          );
        }
        
        setProfile(userProfile);

        // Get current room info
        const roomId = MatrixClientUtil.getDefaultRoomId();
        const room = client.getRoom(roomId);
        if (room) {
          setCurrentRoom({
            name: room.name,
            avatarUrl: room.getAvatarUrl(client.baseUrl, 96, 96, 'crop'),
            memberCount: room.getJoinedMembers().length
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return { profile, currentRoom };
}