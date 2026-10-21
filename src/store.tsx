import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Token, Note, DiceRoll, MapState, Tool, GridType, FogCell, Position } from './types';

interface AppState {
  tokens: Token[];
  notes: Note[];
  diceLog: DiceRoll[];
  map: MapState;
  fog: FogCell[];
  selectedTool: Tool;
  selectedTokenId: string | null;
  initiativeOrder: string[];
  currentTurn: number;
  round: number;
  combatActive: boolean;
  showPlayerView: boolean;
}

type Action =
  | { type: 'SET_TOOL'; tool: Tool }
  | { type: 'ADD_TOKEN'; token: Token }
  | { type: 'UPDATE_TOKEN'; id: string; updates: Partial<Token> }
  | { type: 'REMOVE_TOKEN'; id: string }
  | { type: 'SELECT_TOKEN'; id: string | null }
  | { type: 'ADD_NOTE'; note: Note }
  | { type: 'UPDATE_NOTE'; id: string; updates: Partial<Note> }
  | { type: 'REMOVE_NOTE'; id: string }
  | { type: 'ADD_DICE_ROLL'; roll: DiceRoll }
  | { type: 'CLEAR_DICE_LOG' }
  | { type: 'SET_GRID_SIZE'; size: number }
  | { type: 'SET_GRID_TYPE'; gridType: GridType }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'SET_PAN'; offset: Position }
  | { type: 'TOGGLE_FOG'; cells: FogCell[] }
  | { type: 'REVEAL_ALL_FOG' }
  | { type: 'RESET_FOG' }
  | { type: 'SET_INITIATIVE'; order: string[] }
  | { type: 'NEXT_TURN' }
  | { type: 'PREV_TURN' }
  | { type: 'SET_ROUND'; round: number }
  | { type: 'TOGGLE_COMBAT' }
  | { type: 'TOGGLE_PLAYER_VIEW' };

const initialTokens: Token[] = [
  { id: '1', name: 'Guerreiro', color: '#3b82f6', emoji: '⚔️', position: { x: 200, y: 250 }, size: 40, hp: 45, maxHp: 52, ac: 18, conditions: [], isEnemy: false, initiative: 18 },
  { id: '2', name: 'Ladino', color: '#22c55e', emoji: '🗡️', position: { x: 320, y: 300 }, size: 40, hp: 32, maxHp: 38, ac: 15, conditions: [], isEnemy: false, initiative: 16 },
  { id: '3', name: 'Mago', color: '#a855f7', emoji: '🔮', position: { x: 250, y: 380 }, size: 40, hp: 22, maxHp: 28, ac: 12, conditions: [], isEnemy: false, initiative: 14 },
  { id: '4', name: 'Clérigo', color: '#eab308', emoji: '✝️', position: { x: 380, y: 220 }, size: 40, hp: 38, maxHp: 42, ac: 16, conditions: [], isEnemy: false, initiative: 12 },
  { id: '5', name: 'Goblin', color: '#ef4444', emoji: '👺', position: { x: 550, y: 200 }, size: 36, hp: 7, maxHp: 7, ac: 15, conditions: [], isEnemy: true, initiative: 15 },
  { id: '6', name: 'Goblin', color: '#ef4444', emoji: '👺', position: { x: 600, y: 350 }, size: 36, hp: 5, maxHp: 7, ac: 15, conditions: [], isEnemy: true, initiative: 10 },
  { id: '7', name: 'Ogro', color: '#dc2626', emoji: '👹', position: { x: 650, y: 280 }, size: 48, hp: 42, maxHp: 59, ac: 11, conditions: [], isEnemy: true, initiative: 8 },
];

const initialNotes: Note[] = [
  { id: '1', title: 'Sala do Trono', content: 'Uma sala escura com um trono de pedra coberto de musgo. Armadilhas podem estar escondidas nas paredes.\n\n- Porta ao norte (trancada)\n- Baú ao lado do trono\n- Tochas apagadas', position: { x: 400, y: 150 }, color: '#f59e0b' },
  { id: '2', title: 'Armadilha', content: 'Dardo venenoso: CD 13 dest, 1d4 dano + veneno (CD 12 const ou envenenado 1 minuto)', position: { x: 150, y: 400 }, color: '#ef4444' },
];

const initialState: AppState = {
  tokens: initialTokens,
  notes: initialNotes,
  diceLog: [],
  map: {
    gridSize: 50,
    gridType: 'square',
    gridOffset: { x: 0, y: 0 },
    zoom: 1,
    panOffset: { x: 0, y: 0 },
  },
  fog: [],
  selectedTool: 'select',
  selectedTokenId: null,
  initiativeOrder: ['1', '5', '2', '3', '4', '6', '7'],
  currentTurn: 0,
  round: 3,
  combatActive: true,
  showPlayerView: false,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_TOOL':
      return { ...state, selectedTool: action.tool };
    case 'ADD_TOKEN':
      return { ...state, tokens: [...state.tokens, action.token] };
    case 'UPDATE_TOKEN':
      return {
        ...state,
        tokens: state.tokens.map(t =>
          t.id === action.id ? { ...t, ...action.updates } : t
        ),
      };
    case 'REMOVE_TOKEN':
      return {
        ...state,
        tokens: state.tokens.filter(t => t.id !== action.id),
        selectedTokenId: state.selectedTokenId === action.id ? null : state.selectedTokenId,
      };
    case 'SELECT_TOKEN':
      return { ...state, selectedTokenId: action.id };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.note] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === action.id ? { ...n, ...action.updates } : n
        ),
      };
    case 'REMOVE_NOTE':
      return { ...state, notes: state.notes.filter(n => n.id !== action.id) };
    case 'ADD_DICE_ROLL':
      return { ...state, diceLog: [action.roll, ...state.diceLog].slice(0, 50) };
    case 'CLEAR_DICE_LOG':
      return { ...state, diceLog: [] };
    case 'SET_GRID_SIZE':
      return { ...state, map: { ...state.map, gridSize: action.size } };
    case 'SET_GRID_TYPE':
      return { ...state, map: { ...state.map, gridType: action.gridType } };
    case 'SET_ZOOM':
      return { ...state, map: { ...state.map, zoom: action.zoom } };
    case 'SET_PAN':
      return { ...state, map: { ...state.map, panOffset: action.offset } };
    case 'TOGGLE_FOG':
      return { ...state, fog: action.cells };
    case 'REVEAL_ALL_FOG':
      return { ...state, fog: state.fog.map(c => ({ ...c, revealed: true })) };
    case 'RESET_FOG':
      return { ...state, fog: [] };
    case 'SET_INITIATIVE':
      return { ...state, initiativeOrder: action.order };
    case 'NEXT_TURN': {
      const next = (state.currentTurn + 1) % state.initiativeOrder.length;
      const newRound = next === 0 ? state.round + 1 : state.round;
      return { ...state, currentTurn: next, round: newRound };
    }
    case 'PREV_TURN': {
      const prev = state.currentTurn === 0 ? state.initiativeOrder.length - 1 : state.currentTurn - 1;
      const newRound = state.currentTurn === 0 ? Math.max(1, state.round - 1) : state.round;
      return { ...state, currentTurn: prev, round: newRound };
    }
    case 'SET_ROUND':
      return { ...state, round: action.round };
    case 'TOGGLE_COMBAT':
      return { ...state, combatActive: !state.combatActive };
    case 'TOGGLE_PLAYER_VIEW':
      return { ...state, showPlayerView: !state.showPlayerView };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
