export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 400,
  SLOW: 800,
} as const;

export const VISUALIZATION_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#64748b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  HIGHLIGHT: '#8b5cf6',
} as const;

export const DATA_STRUCTURE_CONFIGS = {
  ARRAY: {
    id: 'array' as const,
    name: 'Array',
    description: 'Contiguous memory with O(1) access',
    maxElements: 20,
    defaultElements: [42, 17, 89, 3, 56],
  },
  LINKED_LIST: {
    id: 'linkedlist' as const,
    name: 'Linked List',
    description: 'Dynamic nodes with pointers',
    maxElements: 15,
    defaultElements: [10, 20, 30],
  },
  STACK: {
    id: 'stack' as const,
    name: 'Stack',
    description: 'LIFO principle structure',
    maxElements: 10,
    defaultElements: [5, 12, 8],
  },
  QUEUE: {
    id: 'queue' as const,
    name: 'Queue',
    description: 'FIFO principle structure',
    maxElements: 12,
    defaultElements: [15, 23, 7, 41],
  },
} as const;

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

export const STORAGE_KEYS = {
  THEME: 'data-structures-theme',
  USER_PREFERENCES: 'data-structures-preferences',
  TUTORIAL_PROGRESS: 'data-structures-tutorial',
} as const;

export const ROUTES = {
  HOME: '/',
  ARRAY: '/array',
  LINKED_LIST: '/linked-list',
  STACK: '/stack',
  QUEUE: '/queue',
  ABOUT: '/about',
} as const;
