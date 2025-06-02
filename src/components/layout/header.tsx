'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { Moon, Sun, Database, Link, Layers, List, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentStructure?: string;
  onStructureChange?: (structure: string) => void;
}

const dataStructures = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'array', name: 'Array', icon: Database },
  { id: 'linkedlist', name: 'Linked List', icon: Link },
  { id: 'stack', name: 'Stack', icon: Layers },
  { id: 'queue', name: 'Queue', icon: List },
];

export function Header({
  currentStructure = 'home',
  onStructureChange,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Database className="text-primary-foreground h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Data Structures</h1>
            <p className="text-muted-foreground hidden text-xs sm:block">
              Interactive Visualizer
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {dataStructures.map(structure => {
            const Icon = structure.icon;
            const isActive = currentStructure === structure.id;

            return (
              <Button
                key={structure.id}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onStructureChange?.(structure.id)}
                className={cn('gap-2 transition-all', isActive && 'shadow-sm')}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{structure.name}</span>
              </Button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
