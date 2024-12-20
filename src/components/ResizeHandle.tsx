import React from 'react';

interface ResizeHandleProps {
  orientation: 'horizontal' | 'vertical';
  onMouseDown: (e: React.MouseEvent) => void;
  className?: string;
}

export default function ResizeHandle({ 
  orientation, 
  onMouseDown,
  className = ''
}: ResizeHandleProps) {
  const isVertical = orientation === 'vertical';
  
  return (
    <div
      onMouseDown={onMouseDown}
      className={`
        group relative cursor-${isVertical ? 'col' : 'row'}-resize
        hover:bg-indigo-100 active:bg-indigo-200
        ${isVertical ? 'w-1' : 'h-1'}
        ${className}
      `}
      role="separator"
      aria-orientation={orientation}
    >
      <div 
        className={`
          absolute bg-gray-200 group-hover:bg-indigo-400 group-active:bg-indigo-600
          ${isVertical 
            ? 'inset-y-0 w-px left-1/2 -translate-x-1/2' 
            : 'inset-x-0 h-px top-1/2 -translate-y-1/2'
          }
        `}
      />
    </div>
  );
}