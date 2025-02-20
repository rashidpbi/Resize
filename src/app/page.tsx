'use client';

import React, { useState } from 'react';
import MeasurementOverlay from '@/components/MeasurementOverlay';
import MeasurementDisplay from '@/components/MeasurementDisplay';
import { Measurements } from '@/types/measurement';

export default function Home() {
  const [measurements, setMeasurements] = useState<Measurements>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  // Temporary document size - replace with actual document dimensions
  const documentSize = { width: 800, height: 1000 };

  return (
    <main className="min-h-screen relative">
      <div className="relative bg-gray-100" style={{ width: documentSize.width, height: documentSize.height }}>
        {/* Document viewer would go here */}
        <MeasurementOverlay
          documentSize={documentSize}
          onMeasurementsChange={setMeasurements}
        />
      </div>
      <MeasurementDisplay measurements={measurements} />
    </main>
  );
} 