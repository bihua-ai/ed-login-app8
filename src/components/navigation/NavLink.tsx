import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ExternalLink as ExternalLinkType } from '../../types/navigation';

interface NavLinkProps {
  link: ExternalLinkType;
  onClick: (url: string) => void;
}

export default function NavLink({ link, onClick }: NavLinkProps) {
  return (
    <button
      onClick={() => onClick(link.url)}
      className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-left"
    >
      <ExternalLink className="h-4 w-4 flex-shrink-0" />
      <span className="truncate">{link.name}</span>
    </button>
  );
}