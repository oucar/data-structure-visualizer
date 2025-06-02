import { useState, useCallback } from 'react';

export function useAnimations() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedItems, setHighlightedItems] = useState<
    Set<string | number>
  >(new Set());
  const [animatingItems, setAnimatingItems] = useState<Set<string | number>>(
    new Set()
  );

  const startAnimation = useCallback((duration: number = 600) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration);
  }, []);

  const highlightItem = useCallback(
    (id: string | number, duration: number = 2000) => {
      setHighlightedItems(prev => new Set(prev).add(id));
      setTimeout(() => {
        setHighlightedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, duration);
    },
    []
  );

  const animateItem = useCallback(
    (id: string | number, duration: number = 600) => {
      setAnimatingItems(prev => new Set(prev).add(id));
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, duration);
    },
    []
  );

  const clearAnimations = useCallback(() => {
    setHighlightedItems(new Set());
    setAnimatingItems(new Set());
    setIsAnimating(false);
  }, []);

  return {
    isAnimating,
    highlightedItems,
    animatingItems,
    startAnimation,
    highlightItem,
    animateItem,
    clearAnimations,
  };
}
