import React from 'react';
import ContactItem from './ContactItem';
import type { Contact } from '../../types/matrix';

interface ContactListProps {
  contacts: Contact[];
  selectedId: string | null;
  onSelectContact: (contact: Contact) => void;
}

export default function ContactList({ contacts, selectedId, onSelectContact }: ContactListProps) {
  return (
    <div className="space-y-1 p-2">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          isSelected={selectedId === contact.id}
          onClick={() => onSelectContact(contact)}
        />
      ))}
    </div>
  );
}