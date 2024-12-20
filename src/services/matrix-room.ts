import { MatrixEvent } from 'matrix-js-sdk';
import { Message } from '../types/matrix';
import { MatrixClientUtil } from '../utils/matrixClient';

export class MatrixRoomService {
  static async getRoomMessages(roomId: string): Promise<Message[]> {
    try {
      const client = await MatrixClientUtil.initialize();
      const room = client.getRoom(roomId);
      
      if (!room) {
        throw new Error('Room not found');
      }

      // Get the most recent messages from the room's timeline
      const events = room.timeline
        .filter(event => event.getType() === 'm.room.message')
        .slice(-50); // Limit to last 50 messages

      return events.map(event => ({
        id: event.getId(),
        content: event.getContent().body || '',
        sender: event.getSender(),
        timestamp: event.getTs(),
      }));
    } catch (error) {
      console.error('Error getting room messages:', error);
      throw new Error('Failed to load room messages');
    }
  }

  static async listenToRoom(roomId: string, callback: (message: Message) => void) {
    try {
      const client = await MatrixClientUtil.initialize();
      
      client.on('Room.timeline', (event: MatrixEvent) => {
        if (event.getRoomId() === roomId && event.getType() === 'm.room.message') {
          callback({
            id: event.getId(),
            content: event.getContent().body || '',
            sender: event.getSender(),
            timestamp: event.getTs(),
          });
        }
      });
    } catch (error) {
      console.error('Error listening to room:', error);
      throw new Error('Failed to listen to room messages');
    }
  }
}