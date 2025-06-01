'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Link, Layers, List, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StructureSelectorProps {
  selectedStructure?: string;
  onSelectStructure: (structure: string) => void;
}

const dataStructures = [
  {
    id: 'array',
    name: 'Array',
    description: 'Contiguous memory with O(1) access time',
    icon: Database,
    complexity: 'Access: O(1), Search: O(n)',
    features: ['Random Access', 'Fixed Size', 'Cache Friendly'],
    color: 'bg-blue-500',
  },
  {
    id: 'linkedlist',
    name: 'Linked List',
    description: 'Dynamic nodes connected with pointers',
    icon: Link,
    complexity: 'Insertion: O(1), Search: O(n)',
    features: ['Dynamic Size', 'Sequential Access', 'Memory Efficient'],
    color: 'bg-green-500',
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'LIFO - Last In First Out principle',
    icon: Layers,
    complexity: 'Push/Pop: O(1)',
    features: ['LIFO Order', 'Function Calls', 'Undo Operations'],
    color: 'bg-purple-500',
  },
  {
    id: 'queue',
    name: 'Queue',
    description: 'FIFO - First In First Out principle',
    icon: List,
    complexity: 'Enqueue/Dequeue: O(1)',
    features: ['FIFO Order', 'Task Scheduling', 'BFS Algorithm'],
    color: 'bg-orange-500',
  },
];

export function StructureSelector({
  selectedStructure,
  onSelectStructure,
}: StructureSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Choose a Data Structure</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Select a data structure below to start learning through interactive
          visualization. Each structure has unique properties and use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {dataStructures.map(structure => {
          const Icon = structure.icon;
          const isSelected = selectedStructure === structure.id;

          return (
            <Card
              key={structure.id}
              className={cn(
                'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
                'group relative overflow-hidden',
                isSelected && 'ring-primary scale-[1.02] shadow-lg ring-2'
              )}
              onClick={() => onSelectStructure(structure.id)}
            >
              {/* Gradient Background */}
              <div
                className={cn(
                  'absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10',
                  structure.color
                )}
              />

              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'rounded-lg p-2 text-white',
                        structure.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {structure.name}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {structure.complexity}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight
                    className={cn(
                      'text-muted-foreground h-5 w-5 transition-all',
                      'group-hover:text-primary group-hover:translate-x-1',
                      isSelected && 'text-primary translate-x-1'
                    )}
                  />
                </div>
                <CardDescription className="text-sm">
                  {structure.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {structure.features.map(feature => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
