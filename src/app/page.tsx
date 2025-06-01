'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTheme } from '@/components/providers/theme-provider';
import { Moon, Sun, Database, Link, Layers, List } from 'lucide-react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  const dataStructures = [
    {
      id: 'array',
      name: 'Array',
      description: 'Contiguous memory with O(1) access',
      icon: Database,
    },
    {
      id: 'linkedlist',
      name: 'Linked List',
      description: 'Dynamic nodes with pointers',
      icon: Link,
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'LIFO principle structure',
      icon: Layers,
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'FIFO principle structure',
      icon: List,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              Data Structures Visualizer
            </h1>
            <p className="text-muted-foreground mt-2">
              Interactive learning tool for computer science fundamentals
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to Data Structures Visualizer!</CardTitle>
            <CardDescription>
              Your journey into understanding fundamental computer science
              concepts starts here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This interactive tool helps you learn data structures through
              visual representations and hands-on manipulation. Choose a data
              structure below to get started!
            </p>
          </CardContent>
        </Card>

        {/* Data Structures Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dataStructures.map(structure => {
            const Icon = structure.icon;
            return (
              <Card
                key={structure.id}
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <Icon className="text-primary mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    {structure.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {structure.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Status */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">Hello world!</p>
        </div>
      </div>
    </div>
  );
}
