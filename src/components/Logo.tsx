import React, { useState, useEffect } from 'react';
import { MATRIX_CONFIG } from '../config/api';
import { createClient } from 'matrix-js-sdk';

export default function Logo() {
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const client = createClient({
          baseUrl: MATRIX_CONFIG.homeserverUrl,
          userId: MATRIX_CONFIG.userId,
        });

        await client.login('m.login.password', {
          user: MATRIX_CONFIG.userId,
          password: MATRIX_CONFIG.password,
        });

        const profile = await client.getProfileInfo(MATRIX_CONFIG.userId);
        
        if (profile.displayname) {
          setDisplayName(profile.displayname);
        }
        
        if (profile.avatar_url) {
          const mediaUrl = client.mxcUrlToHttp(profile.avatar_url);
          setAvatarUrl(mediaUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.displayname || 'User'}`);
        } else {
          setAvatarUrl(`https://api.dicebear.com/7.x/initials/svg?seed=${profile.displayname || 'User'}`);
        }

        client.stopClient();
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setDisplayName('User');
        setAvatarUrl(`https://api.dicebear.com/7.x/initials/svg?seed=User`);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <img 
        src="/assets/bihua.png" 
        alt="Bihua Logo" 
        className="h-8 object-contain"
      />
      
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-900">
          {displayName || 'Loading...'}
        </span>
        <img
          src={avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=User`}
          alt={displayName || 'User Avatar'}
          className="w-8 h-8 rounded-full bg-gray-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${displayName || 'User'}`;
          }}
        />
      </div>
    </div>
  );
}