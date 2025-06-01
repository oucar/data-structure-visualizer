'use client';

import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, Trash2, Shuffle, RotateCcw } from 'lucide-react';
import { cn, generateId, validateNumberInput } from '@/lib/utils';
import type { ArrayElement } from '@/types';

interface ArrayVisualizerProps {
  isDark?: boolean;
}

export function ArrayVisualizer({ isDark = false }: ArrayVisualizerProps) {
  const [data, setData] = useState<ArrayElement[]>([
    { id: generateId(), value: 42, isHighlighted: false },
    { id: generateId(), value: 17, isHighlighted: false },
    { id: generateId(), value: 89, isHighlighted: false },
    { id: generateId(), value: 3, isHighlighted: false },
    { id: generateId(), value: 56, isHighlighted: false },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const operations = {
    push: () => {
      const value = validateNumberInput(inputValue);
      if (value === null || data.length >= 15) return;

      const newElement: ArrayElement = {
        id: generateId(),
        value,
        isHighlighted: false,
        isAnimating: true,
      };

      setAnimatingIndex(data.length);
      setData(prev => [...prev, newElement]);
      setInputValue('');

      setTimeout(() => {
        setAnimatingIndex(null);
        setData(prev => prev.map(item => ({ ...item, isAnimating: false })));
      }, 500);
    },

    insert: () => {
      const value = validateNumberInput(inputValue);
      const index = validateNumberInput(insertIndex);

      if (
        value === null ||
        index === null ||
        index < 0 ||
        index > data.length ||
        data.length >= 15
      ) {
        return;
      }

      const newElement: ArrayElement = {
        id: generateId(),
        value,
        isHighlighted: false,
        isAnimating: true,
      };

      setAnimatingIndex(index);
      const newData = [...data];
      newData.splice(index, 0, newElement);
      setData(newData);
      setInputValue('');
      setInsertIndex('');

      setTimeout(() => {
        setAnimatingIndex(null);
        setData(prev => prev.map(item => ({ ...item, isAnimating: false })));
      }, 500);
    },

    remove: (index: number) => {
      setData(prev => prev.filter((_, i) => i !== index));
      if (highlightedIndex === index) {
        setHighlightedIndex(null);
      }
    },

    search: () => {
      const value = validateNumberInput(searchValue);
      if (value === null) return;

      const index = data.findIndex(item => item.value === value);
      if (index !== -1) {
        setHighlightedIndex(index);
        setTimeout(() => setHighlightedIndex(null), 2000);
      }
    },

    shuffle: () => {
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setData(shuffled);
      setHighlightedIndex(null);
    },

    clear: () => {
      setData([]);
      setHighlightedIndex(null);
      setInputValue('');
      setInsertIndex('');
      setSearchValue('');
    },
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = svgRef.current.clientWidth || 800;
    const width = Math.max(containerWidth, data.length * 80 + 40);
    const height = 200;
    const cellWidth = 70;
    const cellHeight = 50;

    svg.attr('width', width).attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(20, ${height / 2 - cellHeight / 2})`);

    // Array cells
    const cells = g
      .selectAll('.cell')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'cell')
      .attr('transform', (d, i) => `translate(${i * (cellWidth + 10)}, 0)`);

    // Cell rectangles
    cells
      .append('rect')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('rx', 8)
      .attr('fill', (d, i) => {
        if (i === highlightedIndex) return '#10b981';
        if (i === animatingIndex) return '#f59e0b';
        return '#3b82f6';
      })
      .attr('stroke', isDark ? '#64748b' : '#1e40af')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('filter', (d, i) => {
        if (i === animatingIndex) return 'drop-shadow(0 0 10px #f59e0b)';
        if (i === highlightedIndex) return 'drop-shadow(0 0 8px #10b981)';
        return 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
      })
      .on('click', (event, d) => {
        const index = data.findIndex(item => item.id === d.id);
        operations.remove(index);
      })
      .on('mouseover', function () {
        d3.select(this).style('opacity', 0.8);
      })
      .on('mouseout', function () {
        d3.select(this).style('opacity', 1);
      });

    // Cell values
    cells
      .append('text')
      .attr('x', cellWidth / 2)
      .attr('y', cellHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', '16px')
      .style('pointer-events', 'none')
      .text(d => d.value);

    // Index labels
    cells
      .append('text')
      .attr('x', cellWidth / 2)
      .attr('y', cellHeight + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', isDark ? '#94a3b8' : '#64748b')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('pointer-events', 'none')
      .text((d, i) => `[${i}]`);
  }, [data, highlightedIndex, animatingIndex, isDark]);

  return (
    <div className="space-y-6">
      {/* Visualization Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Array Visualization
            <Badge variant="outline">{data.length} elements</Badge>
          </CardTitle>
          <CardDescription>
            Interactive array with push, insert, search, and remove operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 overflow-x-auto rounded-lg border p-4">
            <svg ref={svgRef} className="min-h-[200px] w-full"></svg>
          </div>
          {data.length === 0 && (
            <div className="text-muted-foreground py-8 text-center">
              <p>Array is empty. Add some elements to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Operations Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Operations</CardTitle>
            <CardDescription>Perform array operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Element */}
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Enter value (1-999)"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="w-full"
              />
              <div className="flex gap-2">
                <Button
                  onClick={operations.push}
                  className="flex-1"
                  disabled={data.length >= 15}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Push
                </Button>
                <Button
                  onClick={operations.insert}
                  variant="secondary"
                  className="flex-1"
                  disabled={data.length >= 15}
                >
                  Insert
                </Button>
              </div>
            </div>

            {/* Insert at Index */}
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Index"
                value={insertIndex}
                onChange={e => setInsertIndex(e.target.value)}
                className="w-24"
              />
              <span className="text-muted-foreground self-center text-sm">
                at index (0-{data.length})
              </span>
            </div>

            <Separator />

            {/* Search */}
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={operations.search} variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            {/* Utility Operations */}
            <div className="flex gap-2">
              <Button onClick={operations.shuffle} variant="outline" size="sm">
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle
              </Button>
              <Button onClick={operations.clear} variant="outline" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Array Information</CardTitle>
            <CardDescription>Current array statistics and tips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Length:</span>
                <Badge variant="secondary">{data.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Memory:</span>
                <Badge variant="outline">{data.length * 4} bytes</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Access Time:</span>
                <Badge>O(1)</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Search Time:</span>
                <Badge variant="destructive">O(n)</Badge>
              </div>
            </div>

            <Separator />

            <div className="text-muted-foreground space-y-2 text-sm">
              <p className="text-foreground font-medium">💡 Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Click any element to remove it</li>
                <li>• Search highlights matching elements</li>
                <li>• Push adds to the end (O(1))</li>
                <li>• Insert shifts elements (O(n))</li>
                <li>• Arrays have fixed size in memory</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
