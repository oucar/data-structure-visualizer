'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { StructureSelector } from '@/components/layout/structure-selector';
import { ArrayVisualizer } from '@/components/visualizers/array-visualizer';
import { useTheme } from '@/components/providers/theme-provider';

export default function HomePage() {
  const [currentStructure, setCurrentStructure] = useState<string>('home');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderContent = () => {
    switch (currentStructure) {
      case 'array':
        return <ArrayVisualizer isDark={isDark} />;
      case 'linkedlist':
        return (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">Linked List Visualizer</h2>
            <p className="text-muted-foreground">Coming soon! 🚀</p>
          </div>
        );
      case 'stack':
        return (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">Stack Visualizer</h2>
            <p className="text-muted-foreground">Coming soon! 🚀</p>
          </div>
        );
      case 'queue':
        return (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">Queue Visualizer</h2>
            <p className="text-muted-foreground">Coming soon! 🚀</p>
          </div>
        );
      default:
        return (
          <StructureSelector
            selectedStructure={currentStructure}
            onSelectStructure={setCurrentStructure}
          />
        );
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Header
        currentStructure={currentStructure}
        onStructureChange={setCurrentStructure}
      />

      <main className="container mx-auto px-4 py-8">{renderContent()}</main>

      {/* Footer */}
      <footer className="bg-muted/50 mt-12 border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-muted-foreground text-center text-sm">
            <p>Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui</p>
            <p className="mt-1">
              🚀 Interactive Data Structures Learning Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
