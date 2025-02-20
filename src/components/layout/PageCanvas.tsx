import React, { useState, useRef, useEffect } from 'react';
import { PageSize, PageOrientation, PageMargins, PAGE_SIZES } from '@/types/layout';

interface PageCanvasProps {
  pageSize: PageSize;
  orientation: PageOrientation;
  margins: PageMargins;
  onMarginsChange: (margins: PageMargins) => void;
}

export default function PageCanvas({
  pageSize,
  orientation,
  margins,
  onMarginsChange
}: PageCanvasProps) {
  const [activeDrag, setActiveDrag] = useState<keyof PageMargins | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = 0.5; // 1mm = 0.5px for reasonable screen size

  const dimensions = PAGE_SIZES[pageSize];
  const width = orientation === 'portrait' ? dimensions.width : dimensions.height;
  const height = orientation === 'portrait' ? dimensions.height : dimensions.width;

  const handleMouseDown = (edge: keyof PageMargins) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDrag(edge);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!activeDrag || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newMargins = { ...margins };

    switch (activeDrag) {
      case 'top':
        newMargins.top = Math.max(0, Math.min(
          Math.round((e.clientY - rect.top) / scale),
          height - margins.bottom - 20
        ));
        break;
      case 'right':
        newMargins.right = Math.max(0, Math.min(
          Math.round((rect.right - e.clientX) / scale),
          width - margins.left - 20
        ));
        break;
      case 'bottom':
        newMargins.bottom = Math.max(0, Math.min(
          Math.round((rect.bottom - e.clientY) / scale),
          height - margins.top - 20
        ));
        break;
      case 'left':
        newMargins.left = Math.max(0, Math.min(
          Math.round((e.clientX - rect.left) / scale),
          width - margins.right - 20
        ));
        break;
    }

    onMarginsChange(newMargins);
  };

  const handleMouseUp = () => {
    setActiveDrag(null);
  };

  useEffect(() => {
    if (activeDrag) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDrag, handleMouseMove]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative bg-white shadow-xl"
        style={{
          width: width * scale,
          height: height * scale,
        }}
      >
        {/* Margin area visualization */}
        <div
          className="absolute bg-blue-50 border border-dashed border-blue-300"
          style={{
            top: margins.top * scale,
            right: margins.right * scale,
            bottom: margins.bottom * scale,
            left: margins.left * scale,
          }}
        />

        {/* Margin handles */}
        <div
          className="absolute left-0 right-0 h-1 bg-blue-500 cursor-ns-resize hover:h-2 transition-all"
          style={{ top: margins.top * scale }}
          onMouseDown={handleMouseDown('top')}
        />
        <div
          className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize hover:w-2 transition-all"
          style={{ right: margins.right * scale }}
          onMouseDown={handleMouseDown('right')}
        />
        <div
          className="absolute left-0 right-0 h-1 bg-blue-500 cursor-ns-resize hover:h-2 transition-all"
          style={{ bottom: margins.bottom * scale }}
          onMouseDown={handleMouseDown('bottom')}
        />
        <div
          className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize hover:w-2 transition-all"
          style={{ left: margins.left * scale }}
          onMouseDown={handleMouseDown('left')}
        />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {width} × {height} mm • Drag handles to adjust margins
      </div>
    </div>
  );
} 