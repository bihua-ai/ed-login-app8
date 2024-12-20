import { createClient, MatrixClient } from 'matrix-js-sdk';
import { useAuth } from '../contexts/AuthContext';

export class MatrixClientUtil {
  private static client: MatrixClient | null = null;
  private static syncPromise: Promise<void> | null = null;
  private static currentRoomId: string = '!IrwcvKRWDxTHuwwtMi:messenger.b1.shuwantech.com';

  static getDefaultRoomId() {
    return this.currentRoomId;
  }

  static setCurrentRoomId(roomId: string) {
    this.currentRoomId = roomId;
  }

  static async initialize() {
    if (!this.client) {
      // Get auth state from localStorage
      const authState = localStorage.getItem('matrix_auth_state');
      if (!authState) {
        throw new Error('No authentication credentials found');
      }

      const { accessToken, userId, homeServer } = JSON.parse(authState);
      if (!accessToken || !userId || !homeServer) {
        throw new Error('Invalid authentication credentials');
      }

      // Create client with user credentials
      this.client = createClient({
        baseUrl: homeServer,
        accessToken: accessToken,
        userId: userId,
        timelineSupport: true,
      });

      // Start client if not already started
      if (!this.client.clientRunning) {
        this.syncPromise = new Promise((resolve) => {
          if (!this.client) return;

          const handleSync = (state: string) => {
            if (state === 'PREPARED') {
              this.client?.removeListener('sync', handleSync);
              resolve();
            }
          };

          this.client.on('sync', handleSync);
          this.client.startClient({ initialSyncLimit: 10 });
        });

        try {
          await this.syncPromise;
        } catch (error) {
          console.error('Sync failed:', error);
          throw new Error('Failed to sync with Matrix server');
        }
      }
    }

    return this.client;
  }

  static async getProfileInfo(userId: string) {
    try {
      const client = await this.initialize();
      return await client.getProfileInfo(userId);
    } catch (error) {
      console.error('Failed to get profile info:', error);
      throw error;
    }
  }

  static async sendMessage(message: string, roomId?: string) {
    try {
      const client = await this.initialize();
      
      if (this.syncPromise) {
        await this.syncPromise;
      }

      const targetRoomId = roomId || this.currentRoomId;
      await client.sendTextMessage(targetRoomId, message);
    } catch (error) {
      console.error('Failed to send Matrix message:', error);
      throw new Error('Failed to send message to Matrix room');
    }
  }

  static async getRoomMessages(roomId: string, limit = 50) {
    try {
      const client = await this.initialize();
      const room = client.getRoom(roomId);
      
      if (!room) {
        throw new Error('Room not found');
      }

      const timeline = await room.getLiveTimeline();
      return timeline.getEvents().slice(-limit);
    } catch (error) {
      console.error('Failed to get room messages:', error);
      throw error;
    } 
  }

  static cleanup() {
    if (this.client) {
      this.client.stopClient();
      this.client.removeAllListeners();
      this.client = null;
    }
    this.syncPromise = null;
  }
}