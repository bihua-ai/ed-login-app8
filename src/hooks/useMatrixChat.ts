import { useState, useRef, useCallback, useEffect } from 'react';
import { MatrixClientUtil } from '../utils/matrixClient';
import { MatrixRoomService } from '../services/matrix-room';
import { useMessageProfiles } from './useMessageProfiles';
import type { Message } from '../types/matrix';

export function useMatrixChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVoiceMessageSending, setIsVoiceMessageSending] = useState(false);
  const [currentRoom, setCurrentRoomState] = useState<string | null>(null);
  
  const clientRef = useRef<any>(null);
  const processedMessagesRef = useRef(new Set<string>());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getOrFetchProfile } = useMessageProfiles();

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() || !isConnected || !currentRoom) return;

    try {
      await MatrixClientUtil.sendMessage(newMessage.trim(), currentRoom);
      setNewMessage('');
      setError(null);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('发送消息失败');
    }
  }, [newMessage, isConnected, currentRoom]);

  const handleVoiceRecording = useCallback(async (blob: Blob) => {
    if (!isConnected || !currentRoom) return;

    setIsVoiceMessageSending(true);
    try {
      const client = await MatrixClientUtil.initialize();
      const uploadResponse = await client.uploadContent(blob);
      
      await client.sendMessage(currentRoom, {
        body: 'Voice message',
        info: {
          size: blob.size,
          mimetype: blob.type,
        },
        msgtype: 'm.audio',
        url: uploadResponse.content_uri,
      });
      
      setError(null);
    } catch (err) {
      console.error('Error sending voice message:', err);
      setError('发送语音消息失败');
    } finally {
      setIsVoiceMessageSending(false);
    }
  }, [isConnected, currentRoom]);

  const handleChatAction = useCallback((action: string) => {
    switch (action) {
      case 'analyze':
        // Handle data analysis
        break;
      case 'graph':
        // Handle graph drawing
        break;
      case 'report':
        // Handle report generation
        break;
      case 'new':
        setMessages([]);
        break;
    }
  }, []);

  const setCurrentRoom = useCallback(async (roomId: string) => {
    try {
      setCurrentRoomState(roomId);
      setMessages([]);
      setError(null);
      MatrixClientUtil.setCurrentRoomId(roomId);
    } catch (err) {
      console.error('Error switching room:', err);
      setError('切换房间失败');
    }
  }, []);

  const loadRoomMessages = useCallback(async (roomId: string) => {
    try {
      const roomMessages = await MatrixRoomService.getRoomMessages(roomId);
      console.log("current room id in loadRoomMessages = ", roomId)
      const messagesWithProfiles = await Promise.all(
        roomMessages.map(async (message) => {
          const profile = await getOrFetchProfile(message.sender);
          return {
            ...message,
            avatar: profile?.avatar_url,
            displayName: profile?.displayname || message.sender.split(':')[0].substring(1)
          };
        })
      );
      console.log("current room messages in loadRoomMessages =", messagesWithProfiles)
      setMessages(messagesWithProfiles);
      setTimeout(scrollToBottom, 100);
    } catch (err) {
      console.error('Error loading room messages:', err);
      setError('加载消息失败');
    }
  }, [getOrFetchProfile, scrollToBottom]);

  useEffect(() => {
    const initMatrix = async () => {
      try {
        const client = await MatrixClientUtil.initialize();
        clientRef.current = client;
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('Matrix init error:', err);
        setError('无法连接到聊天服务器');
        setIsConnected(false);
      }
    };

    initMatrix();

    return () => {
      MatrixClientUtil.cleanup();
    };
  }, []);

  return {
    messages,
    newMessage,
    isConnected,
    error,
    isVoiceMessageSending,
    clientRef,
    messagesEndRef,
    setNewMessage,
    handleSend,
    handleKeyPress,
    handleVoiceRecording,
    handleChatAction,
    scrollToBottom,
    setCurrentRoom,
    loadRoomMessages,
    currentRoom,
  };
}