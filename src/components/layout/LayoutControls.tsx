import React from 'react';
import { PageSize, PageOrientation, PageMargins } from '@/types/layout';

interface LayoutControlsProps {
  pageSize: PageSize;
  orientation: PageOrientation;
  margins: PageMargins;
  onPageSizeChange: (size: PageSize) => void;
  onOrientationChange: (orientation: PageOrientation) => void;
}

export default function LayoutControls({
  pageSize,
  orientation,
  margins,
  onPageSizeChange,
  onOrientationChange
}: LayoutControlsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Page Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['a4', 'letter', 'legal', 'a3'] as PageSize[]).map((size) => (
            <button
              key={size}
              onClick={() => onPageSizeChange(size)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                pageSize === size
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Orientation</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['portrait', 'landscape'] as PageOrientation[]).map((orient) => (
            <button
              key={orient}
              onClick={() => onOrientationChange(orient)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                orientation === orient
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {orient.charAt(0).toUpperCase() + orient.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Margins (mm)</h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm text-gray-600">Top</label>
            <div className="font-medium">{margins.top}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Right</label>
            <div className="font-medium">{margins.right}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Bottom</label>
            <div className="font-medium">{margins.bottom}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Left</label>
            <div className="font-medium">{margins.left}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 