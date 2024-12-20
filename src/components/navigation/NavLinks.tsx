import React from 'react';
import NavLink from './NavLink';
import { ExternalLink } from '../../types/navigation';
import { EXTERNAL_LINKS } from '../../config/navigation';

interface NavLinksProps {
  onNavigate: (url: string) => void;
}

export default function NavLinks({ onNavigate }: NavLinksProps) {
  return (
    <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
      {EXTERNAL_LINKS.map((link) => (
        <NavLink
          key={link.url}
          link={link}
          onClick={onNavigate}
        />
      ))}
    </nav>
  );
}