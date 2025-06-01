'use client';

import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, Shuffle, RotateCcw, Database } from 'lucide-react';
import { generateId, validateNumberInput } from '@/lib/utils';
import { VisualizationCard } from '@/components/shared/visualization-card';
import { OperationsPanel } from '@/components/shared/operations-panel';
import { InfoPanel } from '@/components/shared/info-panel';
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
  const [isAnimating, setIsAnimating] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  const operations = {
    push: () => {
      const value = validateNumberInput(inputValue);
      if (value === null || data.length >= 15 || isAnimating) return;

      setIsAnimating(true);
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
        setIsAnimating(false);
        setData(prev => prev.map(item => ({ ...item, isAnimating: false })));
      }, 600);
    },

    insert: () => {
      const value = validateNumberInput(inputValue);
      const index = validateNumberInput(insertIndex);

      if (
        value === null ||
        index === null ||
        index < 0 ||
        index > data.length ||
        data.length >= 15 ||
        isAnimating
      ) {
        return;
      }

      setIsAnimating(true);
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
        setIsAnimating(false);
        setData(prev => prev.map(item => ({ ...item, isAnimating: false })));
      }, 600);
    },

    remove: (index: number) => {
      if (isAnimating) return;
      setData(prev => prev.filter((_, i) => i !== index));
      if (highlightedIndex === index) {
        setHighlightedIndex(null);
      }
    },

    search: () => {
      const value = validateNumberInput(searchValue);
      if (value === null || isAnimating) return;

      setIsAnimating(true);
      const index = data.findIndex(item => item.value === value);

      if (index !== -1) {
        setHighlightedIndex(index);
        setTimeout(() => {
          setHighlightedIndex(null);
          setIsAnimating(false);
        }, 2500);
      } else {
        setIsAnimating(false);
      }
      setSearchValue('');
    },

    shuffle: () => {
      if (isAnimating) return;
      setIsAnimating(true);
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setData(shuffled);
      setHighlightedIndex(null);
      setTimeout(() => setIsAnimating(false), 800);
    },

    clear: () => {
      if (isAnimating) return;
      setData([]);
      setHighlightedIndex(null);
      setInputValue('');
      setInsertIndex('');
      setSearchValue('');
    },

    generateRandom: () => {
      if (isAnimating) return;
      setIsAnimating(true);
      const randomData = Array.from(
        { length: Math.floor(Math.random() * 8) + 3 },
        () => ({
          id: generateId(),
          value: Math.floor(Math.random() * 99) + 1,
          isHighlighted: false,
        })
      );
      setData(randomData);
      setHighlightedIndex(null);
      setTimeout(() => setIsAnimating(false), 800);
    },
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = svgRef.current.clientWidth || 800;
    const width = Math.max(containerWidth, data.length * 85 + 40);
    const height = 250;
    const cellWidth = 75;
    const cellHeight = 55;

    svg.attr('width', width).attr('height', height);

    // Create gradient definitions
    const defs = svg.append('defs');

    const primaryGradient = defs
      .append('linearGradient')
      .attr('id', 'primaryGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    primaryGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 1);

    primaryGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#1d4ed8')
      .attr('stop-opacity', 1);

    const highlightGradient = defs
      .append('linearGradient')
      .attr('id', 'highlightGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    highlightGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 1);

    highlightGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#059669')
      .attr('stop-opacity', 1);

    const animatingGradient = defs
      .append('linearGradient')
      .attr('id', 'animatingGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    animatingGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f59e0b')
      .attr('stop-opacity', 1);

    animatingGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#d97706')
      .attr('stop-opacity', 1);

    const g = svg
      .append('g')
      .attr('transform', `translate(20, ${height / 2 - cellHeight / 2})`);

    // Array title
    g.append('text')
      .attr('x', -10)
      .attr('y', -30)
      .attr('fill', isDark ? '#f1f5f9' : '#1e293b')
      .style('font-weight', '600')
      .style('font-size', '14px')
      .text('Array Elements');

    // Array cells
    const cells = g
      .selectAll('.cell')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'cell')
      .attr('transform', (d, i) => `translate(${i * (cellWidth + 10)}, 0)`);

    // Cell rectangles with enhanced styling
    cells
      .append('rect')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('rx', 12)
      .attr('ry', 12)
      .attr('fill', (d, i) => {
        if (i === highlightedIndex) return 'url(#highlightGradient)';
        if (i === animatingIndex) return 'url(#animatingGradient)';
        return 'url(#primaryGradient)';
      })
      .attr('stroke', (d, i) => {
        if (i === highlightedIndex) return '#10b981';
        if (i === animatingIndex) return '#f59e0b';
        return isDark ? '#475569' : '#3b82f6';
      })
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('filter', (d, i) => {
        if (i === animatingIndex)
          return 'drop-shadow(0 0 15px #f59e0b) drop-shadow(0 4px 8px rgba(0,0,0,0.2))';
        if (i === highlightedIndex)
          return 'drop-shadow(0 0 12px #10b981) drop-shadow(0 4px 8px rgba(0,0,0,0.2))';
        return 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))';
      })
      .on('click', (event, d) => {
        const index = data.findIndex(item => item.id === d.id);
        operations.remove(index);
      })
      .on('mouseover', function (event, d) {
        const index = data.findIndex(item => item.id === d.id);
        if (index !== highlightedIndex && index !== animatingIndex) {
          d3.select(this)
            .transition()
            .duration(200)
            .style(
              'filter',
              'drop-shadow(0 6px 12px rgba(0,0,0,0.25)) brightness(1.1)'
            )
            .attr('transform', 'scale(1.05)');
        }
      })
      .on('mouseout', function (event, d) {
        const index = data.findIndex(item => item.id === d.id);
        if (index !== highlightedIndex && index !== animatingIndex) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))')
            .attr('transform', 'scale(1)');
        }
      });

    // Cell values with better typography
    cells
      .append('text')
      .attr('x', cellWidth / 2)
      .attr('y', cellHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('dy', 6)
      .attr('fill', 'white')
      .style('font-weight', '700')
      .style('font-size', '18px')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 2px rgba(0,0,0,0.3)')
      .text(d => d.value);

    // Index labels with better styling
    cells
      .append('text')
      .attr('x', cellWidth / 2)
      .attr('y', cellHeight + 25)
      .attr('text-anchor', 'middle')
      .attr('fill', isDark ? '#94a3b8' : '#64748b')
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('pointer-events', 'none')
      .text((d, i) => `[${i}]`);

    // Memory addresses (simulated)
    cells
      .append('text')
      .attr('x', cellWidth / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('fill', isDark ? '#64748b' : '#94a3b8')
      .style('font-size', '10px')
      .style('font-family', 'monospace')
      .style('pointer-events', 'none')
      .text((d, i) => `0x${(1000 + i * 4).toString(16).toUpperCase()}`);

    // Animate new elements
    if (animatingIndex !== null) {
      const animatingCell = cells.filter((d, i) => i === animatingIndex);
      animatingCell
        .select('rect')
        .style('transform', 'scale(0)')
        .transition()
        .duration(600)
        .ease(d3.easeBounceOut)
        .style('transform', 'scale(1)');
    }
  }, [data, highlightedIndex, animatingIndex, isDark]);

  // Stats for InfoPanel
  const stats = [
    { label: 'Length', value: data.length, variant: 'secondary' as const },
    {
      label: 'Memory',
      value: `${data.length * 4}B`,
      variant: 'outline' as const,
    },
    { label: 'Capacity', value: '15 max', variant: 'outline' as const },
    {
      label: 'Usage',
      value: `${Math.round((data.length / 15) * 100)}%`,
      variant: (data.length > 10 ? 'destructive' : 'default') as const,
    },
  ];

  const complexity = [
    { operation: 'Access', time: 'O(1)', variant: 'default' as const },
    { operation: 'Search', time: 'O(n)', variant: 'destructive' as const },
    { operation: 'Insert', time: 'O(n)', variant: 'destructive' as const },
    { operation: 'Delete', time: 'O(n)', variant: 'destructive' as const },
  ];

  const tips = [
    'Click elements to remove them',
    'Search highlights matching elements',
    'Push adds to end (fastest operation)',
    'Insert shifts elements (slower)',
    'Arrays have contiguous memory',
    'Memory addresses shown above elements',
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Visualization */}
      <VisualizationCard
        title="Array Visualizer"
        description="Interactive array with real-time operations and animations"
        icon={<Database className="h-6 w-6" />}
        elementCount={data.length}
        complexity="O(1) access"
      >
        <div className="border-muted from-muted/30 via-background to-muted/30 overflow-x-auto rounded-xl border-2 bg-gradient-to-br p-6">
          <svg ref={svgRef} className="min-h-[250px] w-full"></svg>
        </div>
        {data.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">📊</div>
            <h3 className="mb-2 text-xl font-semibold">Array is empty</h3>
            <p className="text-muted-foreground mb-4">
              Add some elements to get started!
            </p>
            <Button onClick={operations.generateRandom} variant="outline">
              Generate Random Data
            </Button>
          </div>
        )}
      </VisualizationCard>

      {/* Operations and Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OperationsPanel title="Array Operations">
          {/* Add Element */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Add Element</label>
            <Input
              type="number"
              placeholder="Enter value (1-999)"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="text-lg"
              disabled={isAnimating}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={operations.push}
                disabled={data.length >= 15 || isAnimating}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Push
              </Button>
              <Button
                onClick={operations.insert}
                variant="secondary"
                disabled={data.length >= 15 || isAnimating}
                className="gap-2"
              >
                Insert
              </Button>
            </div>
          </div>

          {/* Insert at Index */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Index"
              value={insertIndex}
              onChange={e => setInsertIndex(e.target.value)}
              className="w-20"
              disabled={isAnimating}
            />
            <span className="text-muted-foreground text-sm">
              at position (0-{data.length})
            </span>
          </div>

          <Separator />

          {/* Search */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Search Element</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="flex-1"
                disabled={isAnimating}
              />
              <Button
                onClick={operations.search}
                variant="outline"
                disabled={isAnimating}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Utility Operations */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={operations.shuffle}
              variant="outline"
              size="sm"
              disabled={isAnimating}
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle
            </Button>
            <Button
              onClick={operations.generateRandom}
              variant="outline"
              size="sm"
              disabled={isAnimating}
            >
              <Database className="mr-2 h-4 w-4" />
              Random
            </Button>
          </div>
          <Button
            onClick={operations.clear}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={isAnimating}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear Array
          </Button>
        </OperationsPanel>

        <InfoPanel
          title="Array Information"
          description="Current array statistics and complexity analysis"
          stats={stats}
          complexity={complexity}
          tips={tips}
        />
      </div>
    </div>
  );
}
