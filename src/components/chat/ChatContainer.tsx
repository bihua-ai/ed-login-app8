import React, { useState, useCallback, useEffect } from 'react';
import ResizeHandle from '../ResizeHandle';
import MatrixContactList from '../MatrixContactList';
import ChatArea from './ChatArea';
import ContactHeader from './ContactHeader';
import ChatHeader from './ChatHeader';
import { Contact } from '../../types/matrix';

interface ChatContainerProps {
  chatAreaProps: React.ComponentProps<typeof ChatArea>;
  onContactSelect: (contact: Contact) => void;
}

export default function ChatContainer({ chatAreaProps, onContactSelect }: ChatContainerProps) {
  const [contactListWidth, setContactListWidth] = useState(280);
  const [isResizingContacts, setIsResizingContacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactResize = useCallback((e: MouseEvent) => {
    if (!isResizingContacts) return;
    const containerElement = document.querySelector('.matrix-chat-container');
    if (!containerElement) return;
    
    const newWidth = e.clientX - containerElement.getBoundingClientRect().left;
    if (newWidth >= 200 && newWidth <= 400) {
      setContactListWidth(newWidth);
    }
  }, [isResizingContacts]);

  const handleMouseUp = useCallback(() => {
    setIsResizingContacts(false);
    document.body.classList.remove('select-none');
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsResizingContacts(true);
    document.body.classList.add('select-none');
  }, []);

  useEffect(() => {
    if (isResizingContacts) {
      window.addEventListener('mousemove', handleContactResize);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleContactResize);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isResizingContacts, handleContactResize, handleMouseUp]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    onContactSelect(contact);
  };

  return (
    <div className="matrix-chat-container flex h-full relative">
      <div 
        style={{ width: `${contactListWidth}px` }}
        className="flex-shrink-0 border-r border-gray-200 flex flex-col"
      >
        <ContactHeader onSearch={setSearchQuery} />
        <div className="flex-1 overflow-hidden">
          <MatrixContactList 
            onSelectContact={handleContactSelect}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      <ResizeHandle
        orientation="vertical"
        onMouseDown={handleMouseDown}
        className={isResizingContacts ? 'bg-indigo-200' : ''}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader selectedContact={selectedContact} />
        <div className="flex-1 overflow-hidden">
          <ChatArea 
            {...chatAreaProps}
            selectedContact={selectedContact}
          />
        </div>
      </div>
    </div>
  );
}