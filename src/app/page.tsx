'use client';

import LayoutBuilder from '@/components/layout/LayoutBuilder';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Page Layout Configuration</h1>
        <LayoutBuilder
          onConfigChange={(config) => {
            console.log('Layout configuration:', config);
            // Handle the configuration change
          }}
        />
      </div>
    </main>
  );
} 