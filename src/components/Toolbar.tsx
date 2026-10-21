import { motion } from 'framer-motion';
import {
  MousePointer2, Move, Ruler, Cloud, Eraser,
  Pencil, Type, Pin, Undo2, Redo2, ZoomIn, ZoomOut,
  Maximize2, Eye, Compass,
} from 'lucide-react';
import { useApp } from '../store';
import { Tool } from '../types';

const tools: { id: Tool; icon: typeof MousePointer2; label: string; shortcut: string }[] = [
  { id: 'select', icon: MousePointer2, label: 'Selecionar', shortcut: 'V' },
  { id: 'move', icon: Move, label: 'Mover', shortcut: 'M' },
  { id: 'measure', icon: Ruler, label: 'Medir', shortcut: 'R' },
  { id: 'fog', icon: Cloud, label: 'Névoa', shortcut: 'F' },
  { id: 'erase', icon: Eraser, label: 'Apagar Névoa', shortcut: 'E' },
  { id: 'draw', icon: Pencil, label: 'Desenhar', shortcut: 'D' },
  { id: 'text', icon: Type, label: 'Texto', shortcut: 'T' },
  { id: 'pin', icon: Pin, label: 'Fixar Nota', shortcut: 'P' },
];

export default function Toolbar() {
  const { state, dispatch } = useApp();

  return (
    <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-2">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-4 pr-4 border-r border-gray-800">
        <Compass className="w-6 h-6 text-amber-400" />
        <div>
          <div className="text-sm font-bold text-white leading-none">Atlas<span className="text-amber-400">VTT</span></div>
          <div className="text-[10px] text-gray-500">Mesa Virtual</div>
        </div>
      </div>

      {/* Tools */}
      <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 border border-gray-700/30">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => dispatch({ type: 'SET_TOOL', tool: tool.id })}
            className={`relative group flex items-center justify-center w-9 h-9 rounded-md transition-all ${
              state.selectedTool === tool.id
                ? 'bg-amber-500/20 text-amber-400 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            title={`${tool.label} (${tool.shortcut})`}
          >
            <tool.icon className="w-4 h-4" />
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <div className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-[10px] text-white whitespace-nowrap shadow-lg">
                {tool.label} <span className="text-gray-500">({tool.shortcut})</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-gray-800 mx-2" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-white hover:bg-gray-800/50 transition-colors" title="Desfazer (Ctrl+Z)">
          <Undo2 className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-white hover:bg-gray-800/50 transition-colors" title="Refazer (Ctrl+Y)">
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-gray-800 mx-2" />

      {/* Zoom controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.max(0.3, state.map.zoom - 0.1) })}
          className="flex items-center justify-center w-9 h-9 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
          title="Diminuir zoom"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="text-xs text-gray-400 font-mono w-12 text-center">
          {(state.map.zoom * 100).toFixed(0)}%
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.min(3, state.map.zoom + 0.1) })}
          className="flex items-center justify-center w-9 h-9 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
          title="Aumentar zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            dispatch({ type: 'SET_ZOOM', zoom: 1 });
            dispatch({ type: 'SET_PAN', offset: { x: 0, y: 0 } });
          }}
          className="flex items-center justify-center w-9 h-9 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
          title="Resetar visualização"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Scene name */}
      <div className="hidden sm:flex items-center gap-2 bg-gray-800/50 border border-gray-700/30 rounded-lg px-3 py-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-gray-300">O Templo Submerso</span>
      </div>

      {/* Combat indicator */}
      {state.combatActive && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1.5"
        >
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs text-red-400 font-medium">
            Rodada {state.round}
          </span>
        </motion.div>
      )}

      {/* Player view button */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_PLAYER_VIEW' })}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
          state.showPlayerView
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:text-white'
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Jogador</span>
      </button>
    </div>
  );
}
