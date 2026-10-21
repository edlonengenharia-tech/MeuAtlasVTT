export type GridType = 'square' | 'hex' | 'none';

export type Tool = 'select' | 'move' | 'measure' | 'draw' | 'fog' | 'erase' | 'text' | 'pin';

export interface Position {
  x: number;
  y: number;
}

export interface Token {
  id: string;
  name: string;
  color: string;
  emoji: string;
  position: Position;
  size: number;
  hp?: number;
  maxHp?: number;
  ac?: number;
  conditions: string[];
  isEnemy: boolean;
  initiative?: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  position: Position;
  color: string;
}

export interface DiceRoll {
  id: string;
  label: string;
  formula: string;
  results: number[];
  total: number;
  timestamp: number;
}

export interface MapState {
  gridSize: number;
  gridType: GridType;
  gridOffset: Position;
  zoom: number;
  panOffset: Position;
}

export interface FogCell {
  x: number;
  y: number;
  revealed: boolean;
}

export type SidebarTab = 'tokens' | 'initiative' | 'dice' | 'notes' | 'settings';
