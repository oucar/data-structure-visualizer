'use client';

import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HardDrive, Clock } from 'lucide-react';

interface InfoPanelProps {
  title?: string;
  description?: string;
  stats: Array<{
    label: string;
    value: string | number;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  }>;
  complexity: Array<{
    operation: string;
    time: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  }>;
  tips: string[];
  children?: ReactNode;
}

export function InfoPanel({
  title = 'Information',
  description = 'Current statistics and complexity analysis',
  stats,
  complexity,
  tips,
  children,
}: InfoPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{stat.label}:</span>
              <Badge variant={stat.variant || 'secondary'} className="text-sm">
                {stat.value}
              </Badge>
            </div>
          ))}
        </div>

        <Separator />

        {/* Time Complexity */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-medium">
            <Clock className="h-4 w-4" />
            Time Complexity
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {complexity.map((comp, index) => (
              <div key={index} className="flex justify-between">
                <span>{comp.operation}:</span>
                <Badge variant={comp.variant || 'default'} size="sm">
                  {comp.time}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tips */}
        <div className="text-muted-foreground space-y-2 text-sm">
          <p className="text-foreground flex items-center gap-2 font-medium">
            💡 Quick Tips
          </p>
          <ul className="space-y-1 text-xs leading-relaxed">
            {tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
