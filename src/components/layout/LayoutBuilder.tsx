'use client';

import React, { useState } from 'react';
import { PageSize, PageOrientation, PageMargins, PAGE_SIZES, DEFAULT_MARGINS } from '@/types/layout';
import PageCanvas from './PageCanvas';
import LayoutControls from './LayoutControls';

interface LayoutBuilderProps {
  onConfigChange?: (config: {
    pageSize: PageSize;
    orientation: PageOrientation;
    margins: PageMargins;
  }) => void;
}

export default function LayoutBuilder({ onConfigChange }: LayoutBuilderProps) {
  const [pageSize, setPageSize] = useState<PageSize>('a4');
  const [orientation, setOrientation] = useState<PageOrientation>('portrait');
  const [margins, setMargins] = useState<PageMargins>(DEFAULT_MARGINS);

  const handleChange = (
    newPageSize?: PageSize,
    newOrientation?: PageOrientation,
    newMargins?: PageMargins
  ) => {
    const updatedConfig = {
      pageSize: newPageSize || pageSize,
      orientation: newOrientation || orientation,
      margins: newMargins || margins
    };

    setPageSize(updatedConfig.pageSize);
    setOrientation(updatedConfig.orientation);
    setMargins(updatedConfig.margins);
    onConfigChange?.(updatedConfig);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex-1">
        <PageCanvas
          pageSize={pageSize}
          orientation={orientation}
          margins={margins}
          onMarginsChange={(newMargins) => handleChange(pageSize, orientation, newMargins)}
        />
      </div>
      <div className="w-full lg:w-80">
        <LayoutControls
          pageSize={pageSize}
          orientation={orientation}
          margins={margins}
          onPageSizeChange={(size) => handleChange(size, orientation, margins)}
          onOrientationChange={(orient) => handleChange(pageSize, orient, margins)}
        />
      </div>
    </div>
  );
} 