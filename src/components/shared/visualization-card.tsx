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
import { cn } from '@/lib/utils';

interface VisualizationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  elementCount?: number;
  complexity?: string;
  children: ReactNode;
  className?: string;
}

export function VisualizationCard({
  title,
  description,
  icon,
  elementCount,
  complexity,
  children,
  className,
}: VisualizationCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="border-primary/20 from-primary/5 to-primary/5 bg-gradient-to-r via-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              {icon}
            </div>
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {elementCount !== undefined && (
              <Badge variant="outline" className="text-sm">
                {elementCount} elements
              </Badge>
            )}
            {complexity && <Badge variant="secondary">{complexity}</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
