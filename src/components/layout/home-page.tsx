'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Database,
  Link,
  Layers,
  List,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomePageProps {
  onSelectStructure: (structure: string) => void;
}

const dataStructures = [
  {
    id: 'array',
    name: 'Array',
    description: 'Contiguous memory with O(1) access time for random access',
    icon: Database,
    complexity: 'Access: O(1), Search: O(n)',
    features: ['Random Access', 'Fixed Size', 'Cache Friendly'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'linkedlist',
    name: 'Linked List',
    description: 'Dynamic nodes connected with pointers for flexible sizing',
    icon: Link,
    complexity: 'Insertion: O(1), Search: O(n)',
    features: ['Dynamic Size', 'Sequential Access', 'Memory Efficient'],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'LIFO - Last In First Out principle for ordered operations',
    icon: Layers,
    complexity: 'Push/Pop: O(1)',
    features: ['LIFO Order', 'Function Calls', 'Undo Operations'],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 'queue',
    name: 'Queue',
    description:
      'FIFO - First In First Out principle for sequential processing',
    icon: List,
    complexity: 'Enqueue/Dequeue: O(1)',
    features: ['FIFO Order', 'Task Scheduling', 'BFS Algorithm'],
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Interactive Visualizations',
    description:
      'See data structures come to life with smooth animations and real-time updates',
  },
  {
    icon: BookOpen,
    title: 'Learn by Doing',
    description:
      'Hands-on approach to understanding fundamental computer science concepts',
  },
  {
    icon: Code,
    title: 'Algorithm Complexity',
    description:
      'Understand time and space complexity through visual demonstrations',
  },
];

export function HomePage({ onSelectStructure }: HomePageProps) {
  return (
    <div className="animate-fade-in space-y-12">
      {/* Hero Section */}
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Interactive Learning Platform
          </div>
          <h1 className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
            Master Data Structures
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Visualize, interact, and understand fundamental computer science
            concepts through beautiful animations and hands-on exploration.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => onSelectStructure('array')}
            className="gap-2"
          >
            <Database className="h-5 w-5" />
            Start with Arrays
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <BookOpen className="h-5 w-5" />
            View Tutorial
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-primary/10">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Structures Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold">
            Choose Your Data Structure
          </h2>
          <p className="text-muted-foreground">
            Select a data structure below to start your interactive learning
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dataStructures.map(structure => {
            const Icon = structure.icon;

            return (
              <Card
                key={structure.id}
                className={cn(
                  'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                  'group relative overflow-hidden border-2',
                  structure.borderColor
                )}
                onClick={() => onSelectStructure(structure.id)}
              >
                {/* Gradient Background */}
                <div
                  className={cn(
                    'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                    'bg-gradient-to-br',
                    structure.bgColor
                  )}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'rounded-xl bg-gradient-to-br p-3 text-white shadow-lg',
                          structure.color
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-2xl">
                          {structure.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {structure.complexity}
                        </Badge>
                        <CardDescription className="text-sm leading-relaxed">
                          {structure.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight
                      className={cn(
                        'text-muted-foreground mt-2 h-6 w-6 transition-all duration-300',
                        'group-hover:text-primary group-hover:translate-x-1'
                      )}
                    />
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="from-primary/5 via-primary/10 to-primary/5 border-primary/20 bg-gradient-to-r">
        <CardContent className="p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Begin your journey into data structures and algorithms. Each
            visualization is designed to help you understand core concepts
            through interactive exploration.
          </p>
          <Button
            size="lg"
            onClick={() => onSelectStructure('array')}
            className="gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Begin with Arrays
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
