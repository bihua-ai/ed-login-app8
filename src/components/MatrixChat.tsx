import React, { useRef, useCallback, useState } from 'react';
import ChatContainer from './chat/ChatContainer';
import { Contact } from '../types/matrix';
import { useMatrixChat } from '../hooks/useMatrixChat';

export default function MatrixChat() {
  const [messageListHeight, setMessageListHeight] = useState(70);
  const [isResizing, setIsResizing] = useState(false);
  const [contactListWidth, setContactListWidth] = useState(280);
  const [isResizingContacts, setIsResizingContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    newMessage,
    isConnected,
    error,
    isVoiceMessageSending,
    clientRef,
    setNewMessage,
    handleSend,
    handleKeyPress,
    handleVoiceRecording,
    handleChatAction,
    setCurrentRoom,
    loadRoomMessages
  } = useMatrixChat();

  const handleContactSelect = async (contact: Contact) => {
    setSelectedContact(contact);
    console.log("selected contact = ", contact)
    await setCurrentRoom(contact.roomId);
    await loadRoomMessages(contact.roomId);
  };

  const handleContactResize = useCallback((e: MouseEvent) => {
    const containerElement = document.querySelector('.matrix-chat-container');
    if (!isResizingContacts || !containerElement) return;
    
    const newWidth = e.clientX - containerElement.getBoundingClientRect().left;
    if (newWidth >= 200 && newWidth <= 400) {
      setContactListWidth(newWidth);
    }
  }, [isResizingContacts]);

  const chatAreaProps = {
    messages,
    error,
    isConnected,
    messageListHeight,
    newMessage,
    currentUserId: clientRef.current?.getUserId(),
    messagesEndRef,
    textareaRef,
    isVoiceMessageSending,
    selectedContact,
    onSetIsResizing: setIsResizing,
    onMessageChange: setNewMessage,
    onKeyPress: handleKeyPress,
    onSend: handleSend,
    onVoiceRecording: handleVoiceRecording,
    onChatAction: handleChatAction
  };

  return (
    <ChatContainer
      contactListWidth={contactListWidth}
      isResizingContacts={isResizingContacts}
      onContactResize={handleContactResize}
      onSetIsResizingContacts={setIsResizingContacts}
      onContactSelect={handleContactSelect}
      chatAreaProps={chatAreaProps}
    />
  );
}