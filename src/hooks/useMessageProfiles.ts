import { useState, useCallback } from 'react';
import { MatrixClientUtil } from '../utils/matrixClient';

interface MessageProfile {
  avatar_url?: string;
  displayname?: string;
}

export function useMessageProfiles() {
  const [profiles, setProfiles] = useState<Record<string, MessageProfile>>({});

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const client = await MatrixClientUtil.initialize();
      const profile = await client.getProfileInfo(userId);
      
      if (profile.avatar_url) {
        profile.avatar_url = client.mxcUrlToHttp(
          profile.avatar_url,
          96,
          96,
          'crop'
        );
      }

      setProfiles(prev => ({
        ...prev,
        [userId]: profile
      }));

      return profile;
    } catch (err) {
      console.error(`Failed to fetch profile for ${userId}:`, err);
      return null;
    }
  }, []);

  const getOrFetchProfile = useCallback(async (userId: string) => {
    if (profiles[userId]) {
      return profiles[userId];
    }
    return await fetchProfile(userId);
  }, [profiles, fetchProfile]);

  return {
    profiles,
    getOrFetchProfile
  };
}