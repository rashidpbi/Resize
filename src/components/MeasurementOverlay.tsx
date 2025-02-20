import React, { useState, useRef, useEffect } from 'react';
import { Position, Size } from '@/types/measurement';

interface MeasurementOverlayProps {
  documentSize: Size;
  onMeasurementsChange: (measurements: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }) => void;
}

export default function MeasurementOverlay({ 
  documentSize, 
  onMeasurementsChange 
}: MeasurementOverlayProps) {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [size, setSize] = useState<Size>({ width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Convert pixels to millimeters (assuming 96 DPI)
  const pxToMm = (px: number) => px * 0.264583;

  useEffect(() => {
    const measurements = {
      top: Math.round(pxToMm(position.y)),
      bottom: Math.round(pxToMm(documentSize.height - (position.y + size.height))),
      left: Math.round(pxToMm(position.x)),
      right: Math.round(pxToMm(documentSize.width - (position.x + size.width)))
    };
    onMeasurementsChange(measurements);
  }, [position, size, documentSize, onMeasurementsChange]);

  const handleMouseDown = (e: React.MouseEvent, handle?: string) => {
    e.preventDefault();
    setIsDragging(true);
    if (handle) {
      setResizeHandle(handle);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !overlayRef.current) return;

    const rect = overlayRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (resizeHandle) {
      const newSize = { ...size };
      const newPosition = { ...position };

      switch (resizeHandle) {
        case 'left':
          const newWidth = Math.max(50, position.x + size.width - mouseX);
          newPosition.x = Math.min(position.x + size.width - newWidth, position.x + size.width - 50);
          newSize.width = newWidth;
          break;

        case 'right':
          newSize.width = Math.max(50, Math.min(mouseX - position.x, documentSize.width - position.x));
          break;

        case 'top':
          const newHeight = Math.max(50, position.y + size.height - mouseY);
          newPosition.y = Math.min(position.y + size.height - newHeight, position.y + size.height - 50);
          newSize.height = newHeight;
          break;

        case 'bottom':
          newSize.height = Math.max(50, Math.min(mouseY - position.y, documentSize.height - position.y));
          break;
      }

      // Ensure the overlay stays within document bounds
      newPosition.x = Math.max(0, Math.min(newPosition.x, documentSize.width - newSize.width));
      newPosition.y = Math.max(0, Math.min(newPosition.y, documentSize.height - newSize.height));

      setSize(newSize);
      setPosition(newPosition);
    } else {
      // Handle dragging logic
      const newX = Math.max(0, Math.min(mouseX - size.width / 2, documentSize.width - size.width));
      const newY = Math.max(0, Math.min(mouseY - size.height / 2, documentSize.height - size.height));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeHandle(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      ref={overlayRef}
      className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30 cursor-move"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={(e) => handleMouseDown(e)}
    >
      {/* Edge resize handles */}
      <div 
        className="absolute top-0 left-0 w-full h-1 cursor-ns-resize" 
        onMouseDown={(e) => handleMouseDown(e, 'top')} 
      />
      <div 
        className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize" 
        onMouseDown={(e) => handleMouseDown(e, 'bottom')} 
      />
      <div 
        className="absolute top-0 left-0 w-1 h-full cursor-ew-resize" 
        onMouseDown={(e) => handleMouseDown(e, 'left')} 
      />
      <div 
        className="absolute top-0 right-0 w-1 h-full cursor-ew-resize" 
        onMouseDown={(e) => handleMouseDown(e, 'right')} 
      />
    </div>
  );
} 