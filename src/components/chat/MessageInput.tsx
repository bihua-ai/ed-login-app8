import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import VoiceRecorder from '../VoiceRecorder';
import { useLanguage } from '../../contexts/LanguageContext';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceRecording: (blob: Blob) => void;
  isConnected: boolean;
  isVoiceMessageSending: boolean;
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  onVoiceRecording,
  isConnected,
  isVoiceMessageSending
}: MessageInputProps) {
  const { language } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else {
        // Send message with just Enter
        e.preventDefault();
        onSend();
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 pb-4">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!isConnected}
        rows={1}
        className="flex-1 resize-none p-2 rounded-md bg-gray-50 border-0 focus:ring-0 focus:outline-none min-h-[80px] max-h-[200px] overflow-y-auto"
        placeholder={language === 'en' ? 'Type your message... (Shift+Enter for new line)' : '请输入消息...(Shift+Enter换行)'}
      />
      <div className="mt-2 flex justify-between items-center">
        <VoiceRecorder
          onRecordingComplete={onVoiceRecording}
          disabled={!isConnected}
          compact={true}
          isSending={isVoiceMessageSending}
        />
        <button
          className="flex items-center text-blue-500 disabled:text-gray-500"
          onClick={onSend}
          disabled={!isConnected || value.trim() === ''}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}