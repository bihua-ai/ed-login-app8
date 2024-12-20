import React, { useEffect } from 'react';
import MessageBubble from '../MessageBubble';
import ChatActionButtons from '../ChatActionButtons';
import MessageInput from './MessageInput';
import ResizeHandle from '../ResizeHandle';
import WelcomeChat from './WelcomeChat';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Contact } from '../../types/matrix';

interface ChatAreaProps {
  messages: Array<{
    id: string;
    content: string;
    sender: string;
    timestamp: number;
    avatar?: string;
    displayName?: string;
  }>;
  error: string | null;
  isConnected: boolean;
  messageListHeight: number;
  newMessage: string;
  currentUserId?: string;
  selectedContact: Contact | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isVoiceMessageSending: boolean;
  onSetIsResizing: (value: boolean) => void;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  onVoiceRecording: (blob: Blob) => void;
  onChatAction: (action: string) => void;
}

export default function ChatArea({
  messages,
  error,
  isConnected,
  messageListHeight,
  newMessage,
  currentUserId,
  selectedContact,
  messagesEndRef,
  isVoiceMessageSending,
  onSetIsResizing,
  onMessageChange,
  onSend,
  onVoiceRecording,
  onChatAction,
}: ChatAreaProps) {
  const { language } = useLanguage();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!selectedContact) {
    return <WelcomeChat />;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Message List */}
      <div
        style={{
          height: `${messageListHeight}%`,
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        }}
        className="p-4 space-y-4 min-h-[20%]"
      >
        {error && (
          <div className="p-2 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            {language === 'en' ? 'No messages yet' : '暂无消息'}
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
            isCurrentUser={message.sender === currentUserId}
            avatar={message.avatar}
            displayName={message.displayName}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ResizeHandle
        orientation="horizontal"
        onMouseDown={(e) => {
          e.preventDefault();
          onSetIsResizing(true);
        }}
      />

      <div className="flex-1 min-h-[10%] flex flex-col">
        <div className="px-4 pt-2">
          <ChatActionButtons 
            onAction={onChatAction}
            disabled={!isConnected}
          />
        </div>
        <MessageInput
          value={newMessage}
          onChange={onMessageChange}
          onSend={onSend}
          onVoiceRecording={onVoiceRecording}
          isConnected={isConnected}
          isVoiceMessageSending={isVoiceMessageSending}
        />
      </div>
    </div>
  );
}