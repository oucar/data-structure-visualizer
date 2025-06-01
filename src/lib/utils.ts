import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Delay function for animations
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Validate numeric input
export function validateNumberInput(value: string): number | null {
  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

// Generate random array data
export function generateRandomArray(
  length: number,
  min: number = 1,
  max: number = 100
): number[] {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Color utilities for visualizations
export const colors = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
} as const;

// Animation duration constants
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 400,
  SLOW: 800,
} as const;

// Data structure complexity information
export const COMPLEXITY_INFO = {
  array: {
    access: 'O(1)',
    search: 'O(n)',
    insertion: 'O(n)',
    deletion: 'O(n)',
  },
  linkedlist: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
  },
  stack: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
  },
  queue: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
  },
} as const;
