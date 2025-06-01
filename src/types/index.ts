// Data Structure Types
export type DataStructureType = 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'graph';

// Array Types
export interface ArrayElement {
  value: number;
  id: string;
  isHighlighted?: boolean;
  isAnimating?: boolean;
}

// Linked List Types
export interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
  isAnimating?: boolean;
}

// Stack Types
export interface StackElement {
  value: number;
  id: string;
  isTop?: boolean;
}

// Queue Types
export interface QueueElement {
  value: number;
  id: string;
  isFront?: boolean;
  isRear?: boolean;
}

// Tree Types
export interface TreeNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  parent: string | null;
  x?: number;
  y?: number;
}

// Animation Types
export interface AnimationState {
  type: 'insert' | 'delete' | 'search' | 'highlight' | 'none';
  targetId?: string;
  duration?: number;
}

// Data Structure Configuration
export interface DataStructureConfig {
  id: DataStructureType;
  name: string;
  description: string;
  icon: string;
  complexity: {
    access?: string;
    search?: string;
    insertion?: string;
    deletion?: string;
  };
  operations: string[];
}

// Component Props Types
export interface VisualizerProps {
  isDark: boolean;
  isAnimating: boolean;
  onAnimationStart: () => void;
  onAnimationEnd: () => void;
}

export interface ArrayVisualizerProps extends VisualizerProps {
  data: ArrayElement[];
  setData: React.Dispatch<React.SetStateAction<ArrayElement[]>>;
}

export interface LinkedListVisualizerProps extends VisualizerProps {
  nodes: LinkedListNode[];
  setNodes: React.Dispatch<React.SetStateAction<LinkedListNode[]>>;
}

export interface StackVisualizerProps extends VisualizerProps {
  stack: StackElement[];
  setStack: React.Dispatch<React.SetStateAction<StackElement[]>>;
}

export interface QueueVisualizerProps extends VisualizerProps {
  queue: QueueElement[];
  setQueue: React.Dispatch<React.SetStateAction<QueueElement[]>>;
}