import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ExternalPageProps {
  url: string;
}

export default function ExternalPage({ url }: ExternalPageProps) {
  // Directly open in new tab
  window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-8">
        <p className="text-gray-600 mb-4">
          外部链接已在新标签页中打开
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ExternalLink className="h-4 w-4" />
          重新打开链接
        </a>
      </div>
    </div>
  );
}