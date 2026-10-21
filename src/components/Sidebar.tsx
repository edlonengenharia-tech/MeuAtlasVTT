import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Swords, Dice1, FileText, Settings,
  Plus, Minus, Trash2, ChevronUp, ChevronDown,
  Play, Pause, SkipForward, SkipBack, RotateCcw,
} from 'lucide-react';
import { useApp } from '../store';
import { SidebarTab, DiceRoll, Token } from '../types';

const TABS: { id: SidebarTab; label: string; icon: typeof Users }[] = [
  { id: 'tokens', label: 'Tokens', icon: Users },
  { id: 'initiative', label: 'Iniciativa', icon: Swords },
  { id: 'dice', label: 'Dados', icon: Dice1 },
  { id: 'notes', label: 'Notas', icon: FileText },
  { id: 'settings', label: 'Config.', icon: Settings },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('tokens');

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-gray-800">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 text-xs transition-colors ${
              activeTab === tab.id
                ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="p-4"
          >
            {activeTab === 'tokens' && <TokenLibrary />}
            {activeTab === 'initiative' && <InitiativeTracker />}
            {activeTab === 'dice' && <DiceRoller />}
            {activeTab === 'notes' && <NotePanel />}
            {activeTab === 'settings' && <SettingsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TokenLibrary() {
  const { state, dispatch } = useApp();

  const presetTokens = [
    { name: 'Guerreiro', emoji: '⚔️', color: '#3b82f6', isEnemy: false },
    { name: 'Ladino', emoji: '🗡️', color: '#22c55e', isEnemy: false },
    { name: 'Mago', emoji: '🔮', color: '#a855f7', isEnemy: false },
    { name: 'Clérigo', emoji: '✝️', color: '#eab308', isEnemy: false },
    { name: 'Bardo', emoji: '🎵', color: '#ec4899', isEnemy: false },
    { name: 'Druida', emoji: '🌿', color: '#10b981', isEnemy: false },
    { name: 'Goblin', emoji: '👺', color: '#ef4444', isEnemy: true },
    { name: 'Ogro', emoji: '👹', color: '#dc2626', isEnemy: true },
    { name: 'Esqueleto', emoji: '💀', color: '#6b7280', isEnemy: true },
    { name: 'Dragão', emoji: '🐉', color: '#991b1b', isEnemy: true },
    { name: 'Lobo', emoji: '🐺', color: '#78716c', isEnemy: true },
    { name: 'NPC', emoji: '🧑', color: '#8b5cf6', isEnemy: false },
  ];

  const addToken = (preset: typeof presetTokens[0]) => {
    const newToken: Token = {
      id: Date.now().toString(),
      name: preset.name,
      emoji: preset.emoji,
      color: preset.color,
      position: { x: 300 + Math.random() * 200, y: 300 + Math.random() * 200 },
      size: preset.isEnemy ? 36 : 40,
      hp: preset.isEnemy ? 10 : 30,
      maxHp: preset.isEnemy ? 10 : 30,
      ac: preset.isEnemy ? 13 : 15,
      conditions: [],
      isEnemy: preset.isEnemy,
    };
    dispatch({ type: 'ADD_TOKEN', token: newToken });
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Users className="w-4 h-4 text-amber-400" />
        Biblioteca de Tokens
      </h3>
      <p className="text-gray-500 text-xs mb-4">Clique para adicionar ao mapa</p>

      <div className="space-y-2 mb-4">
        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Heróis</div>
        <div className="grid grid-cols-3 gap-2">
          {presetTokens.filter(t => !t.isEnemy).map(preset => (
            <button
              key={preset.name}
              onClick={() => addToken(preset)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-800/50 border border-gray-700/40 hover:border-amber-500/30 hover:bg-gray-800 transition-all group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/20 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: preset.color }}
              >
                <span className="text-sm">{preset.emoji}</span>
              </div>
              <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Inimigos</div>
        <div className="grid grid-cols-3 gap-2">
          {presetTokens.filter(t => t.isEnemy).map(preset => (
            <button
              key={preset.name}
              onClick={() => addToken(preset)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-800/50 border border-gray-700/40 hover:border-red-500/30 hover:bg-gray-800 transition-all group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-red-500/30 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: preset.color }}
              >
                <span className="text-sm">{preset.emoji}</span>
              </div>
              <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current tokens list */}
      <div className="mt-6">
        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
          No Mapa ({state.tokens.length})
        </div>
        <div className="space-y-1">
          {state.tokens.map(token => (
            <div
              key={token.id}
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/30 border border-gray-700/20 hover:border-gray-600/40 transition-colors"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs border border-white/20"
                style={{ backgroundColor: token.color }}
              >
                {token.emoji}
              </div>
              <span className="text-xs text-gray-300 flex-1">{token.name}</span>
              <span className="text-[10px] text-gray-500">
                {token.hp}/{token.maxHp} PV
              </span>
              <button
                onClick={() => dispatch({ type: 'REMOVE_TOKEN', id: token.id })}
                className="text-gray-600 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InitiativeTracker() {
  const { state, dispatch } = useApp();
  const { tokens, initiativeOrder, currentTurn, round, combatActive } = state;

  const orderedTokens = initiativeOrder
    .map(id => tokens.find(t => t.id === id))
    .filter(Boolean) as Token[];

  const moveInInitiative = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...initiativeOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    dispatch({ type: 'SET_INITIATIVE', order: newOrder });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Swords className="w-4 h-4 text-amber-400" />
          Tracker de Iniciativa
        </h3>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_COMBAT' })}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            combatActive
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
          }`}
        >
          {combatActive ? <Play className="w-3 h-3 inline mr-1" /> : <Pause className="w-3 h-3 inline mr-1" />}
          {combatActive ? 'Ativo' : 'Pausado'}
        </button>
      </div>

      {/* Round info */}
      <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">Rodada</div>
          <div className="text-2xl font-bold text-amber-400">{round}</div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-xs text-gray-400">Turno</div>
          <div className="text-sm text-white font-medium">
            {orderedTokens[currentTurn]?.name || '—'}
          </div>
        </div>
        <div className="flex gap-1 mt-3">
          <button
            onClick={() => dispatch({ type: 'PREV_TURN' })}
            className="flex-1 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded px-2 py-1.5 text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <SkipBack className="w-3 h-3" /> Anterior
          </button>
          <button
            onClick={() => dispatch({ type: 'NEXT_TURN' })}
            className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded px-2 py-1.5 text-xs flex items-center justify-center gap-1 transition-colors"
          >
            Próximo <SkipForward className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Initiative order */}
      <div className="space-y-1">
        {orderedTokens.map((token, index) => (
          <motion.div
            key={token.id}
            layout
            className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
              index === currentTurn && combatActive
                ? 'bg-amber-500/10 border-amber-500/30 shadow-sm shadow-amber-500/10'
                : 'bg-gray-800/30 border-gray-700/20'
            }`}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs border border-white/20 flex-shrink-0"
              style={{ backgroundColor: token.color }}
            >
              {token.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white font-medium truncate">{token.name}</div>
              <div className="text-[10px] text-gray-500">{token.hp}/{token.maxHp} PV</div>
            </div>
            <div className="text-amber-400 font-bold text-sm font-mono w-6 text-center">
              {token.initiative || '—'}
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => moveInInitiative(index, 'up')}
                className="text-gray-600 hover:text-white transition-colors"
                disabled={index === 0}
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => moveInInitiative(index, 'down')}
                className="text-gray-600 hover:text-white transition-colors"
                disabled={index === orderedTokens.length - 1}
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reset button */}
      <button
        onClick={() => {
          dispatch({ type: 'SET_ROUND', round: 1 });
          dispatch({ type: 'SET_INITIATIVE', order: state.initiativeOrder });
        }}
        className="w-full mt-4 bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:text-white rounded-lg px-3 py-2 text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <RotateCcw className="w-3 h-3" /> Reiniciar Combate
      </button>
    </div>
  );
}

function DiceRoller() {
  const { state, dispatch } = useApp();
  const [customFormula, setCustomFormula] = useState('');
  const [advantage, setAdvantage] = useState<'normal' | 'adv' | 'des'>('normal');

  const diceTypes = [
    { sides: 4, label: 'd4', color: 'from-red-500 to-red-600' },
    { sides: 6, label: 'd6', color: 'from-orange-500 to-orange-600' },
    { sides: 8, label: 'd8', color: 'from-yellow-500 to-yellow-600' },
    { sides: 10, label: 'd10', color: 'from-green-500 to-green-600' },
    { sides: 12, label: 'd12', color: 'from-blue-500 to-blue-600' },
    { sides: 20, label: 'd20', color: 'from-purple-500 to-purple-600' },
    { sides: 100, label: 'd100', color: 'from-pink-500 to-pink-600' },
  ];

  const rollDice = (sides: number, count: number = 1) => {
    const results: number[] = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }

    let finalResults = results;
    let total = results.reduce((a, b) => a + b, 0);

    if (sides === 20 && count === 1) {
      const secondRoll = Math.floor(Math.random() * sides) + 1;
      if (advantage === 'adv') {
        finalResults = [Math.max(results[0], secondRoll)];
        total = finalResults[0];
      } else if (advantage === 'des') {
        finalResults = [Math.min(results[0], secondRoll)];
        total = finalResults[0];
      }
    }

    const roll: DiceRoll = {
      id: Date.now().toString(),
      label: `${count}${diceTypes.find(d => d.sides === sides)?.label || `d${sides}`}`,
      formula: `${count}d${sides}`,
      results: finalResults,
      total,
      timestamp: Date.now(),
    };

    dispatch({ type: 'ADD_DICE_ROLL', roll });
  };

  const rollCustom = () => {
    if (!customFormula.trim()) return;
    const match = customFormula.match(/(\d+)d(\d+)([+-]\d+)?/i);
    if (match) {
      const count = parseInt(match[1]);
      const sides = parseInt(match[2]);
      const modifier = match[3] ? parseInt(match[3]) : 0;
      const results: number[] = [];
      for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
      }
      const total = results.reduce((a, b) => a + b, 0) + modifier;
      const roll: DiceRoll = {
        id: Date.now().toString(),
        label: customFormula,
        formula: customFormula,
        results,
        total,
        timestamp: Date.now(),
      };
      dispatch({ type: 'ADD_DICE_ROLL', roll });
      setCustomFormula('');
    }
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Dice1 className="w-4 h-4 text-amber-400" />
        Rolagem de Dados
      </h3>

      {/* Advantage toggle */}
      <div className="flex gap-1 mb-4">
        {(['normal', 'adv', 'des'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setAdvantage(mode)}
            className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
              advantage === mode
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:text-white'
            }`}
          >
            {mode === 'normal' ? 'Normal' : mode === 'adv' ? '⭐ Vantagem' : '💀 Desvantagem'}
          </button>
        ))}
      </div>

      {/* Dice buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {diceTypes.map(die => (
          <button
            key={die.sides}
            onClick={() => rollDice(die.sides)}
            className={`bg-gradient-to-br ${die.color} rounded-lg py-3 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg`}
          >
            {die.label}
          </button>
        ))}
        <button
          onClick={() => rollDice(20, 2)}
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg py-3 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-transform shadow-lg col-span-2"
        >
          2d20
        </button>
        <button
          onClick={() => rollDice(6, 2)}
          className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg py-3 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-transform shadow-lg col-span-2"
        >
          2d6
        </button>
      </div>

      {/* Custom formula */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={customFormula}
          onChange={(e) => setCustomFormula(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && rollCustom()}
          placeholder="Ex: 2d8+3"
          className="flex-1 bg-gray-800/50 border border-gray-700/40 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
        />
        <button
          onClick={rollCustom}
          className="bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg px-4 py-2 text-sm font-medium hover:bg-amber-500/30 transition-colors"
        >
          Rolar
        </button>
      </div>

      {/* Roll history */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Histórico</div>
          {state.diceLog.length > 0 && (
            <button
              onClick={() => dispatch({ type: 'CLEAR_DICE_LOG' })}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {state.diceLog.length === 0 ? (
            <p className="text-gray-600 text-xs text-center py-4">Nenhuma rolagem ainda</p>
          ) : (
            state.diceLog.map(roll => (
              <div key={roll.id} className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg border border-gray-700/20">
                <div className="flex-1">
                  <div className="text-xs text-gray-400">{roll.label}</div>
                  <div className="text-[10px] text-gray-600">
                    [{roll.results.join(', ')}]
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  roll.results.includes(20) ? 'text-green-400' :
                  roll.results.includes(1) && roll.formula.includes('d20') ? 'text-red-400' :
                  'text-amber-400'
                }`}>
                  {roll.total}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NotePanel() {
  const { state, dispatch } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addNote = () => {
    if (!newTitle.trim()) return;
    dispatch({
      type: 'ADD_NOTE',
      note: {
        id: Date.now().toString(),
        title: newTitle,
        content: newContent,
        position: { x: 200 + Math.random() * 400, y: 200 + Math.random() * 300 },
        color: '#f59e0b',
      },
    });
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-amber-400" />
        Notas da Cena
      </h3>

      {/* Add note form */}
      <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-3 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Título da nota..."
          className="w-full bg-gray-900/50 border border-gray-700/40 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 mb-2"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Conteúdo (Markdown)..."
          rows={3}
          className="w-full bg-gray-900/50 border border-gray-700/40 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 resize-none mb-2"
        />
        <button
          onClick={addNote}
          className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded px-3 py-1.5 text-xs font-medium hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1"
        >
          <Plus className="w-3 h-3" /> Adicionar Nota ao Mapa
        </button>
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        {state.notes.map(note => (
          <div
            key={note.id}
            className="bg-gray-800/30 border border-gray-700/20 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => setEditingId(editingId === note.id ? null : note.id)}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: note.color }} />
              <span className="text-sm text-white font-medium flex-1">{note.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_NOTE', id: note.id }); }}
                className="text-gray-600 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            {editingId === note.id && (
              <div className="px-2 pb-2">
                <textarea
                  value={note.content}
                  onChange={(e) => dispatch({
                    type: 'UPDATE_NOTE',
                    id: note.id,
                    updates: { content: e.target.value },
                  })}
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-700/40 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { state, dispatch } = useApp();

  return (
    <div>
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Settings className="w-4 h-4 text-amber-400" />
        Configurações do Mapa
      </h3>

      <div className="space-y-4">
        {/* Grid type */}
        <div>
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">
            Tipo de Grid
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(['square', 'hex', 'none'] as const).map(type => (
              <button
                key={type}
                onClick={() => dispatch({ type: 'SET_GRID_TYPE', gridType: type })}
                className={`py-2 rounded text-xs font-medium transition-colors ${
                  state.map.gridType === type
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:text-white'
                }`}
              >
                {type === 'square' ? '⬜ Quadrado' : type === 'hex' ? '⬡ Hex' : '✕ Nenhum'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid size */}
        <div>
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">
            Tamanho da Célula: {state.map.gridSize}px
          </label>
          <input
            type="range"
            min={20}
            max={100}
            value={state.map.gridSize}
            onChange={(e) => dispatch({ type: 'SET_GRID_SIZE', size: parseInt(e.target.value) })}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Zoom */}
        <div>
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">
            Zoom: {(state.map.zoom * 100).toFixed(0)}%
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.max(0.3, state.map.zoom - 0.1) })}
              className="flex-1 bg-gray-800/50 border border-gray-700/30 text-gray-300 rounded py-1.5 text-sm hover:bg-gray-700/50 transition-colors"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_ZOOM', zoom: 1 })}
              className="flex-1 bg-gray-800/50 border border-gray-700/30 text-gray-300 rounded py-1.5 text-xs hover:bg-gray-700/50 transition-colors"
            >
              100%
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.min(3, state.map.zoom + 0.1) })}
              className="flex-1 bg-gray-800/50 border border-gray-700/30 text-gray-300 rounded py-1.5 text-sm hover:bg-gray-700/50 transition-colors"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>

        {/* Fog of war controls */}
        <div>
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">
            Névoa de Guerra
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => dispatch({ type: 'REVEAL_ALL_FOG' })}
              className="bg-green-500/10 border border-green-500/30 text-green-400 rounded px-3 py-2 text-xs hover:bg-green-500/20 transition-colors"
            >
              Revelar Tudo
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET_FOG' })}
              className="bg-red-500/10 border border-red-500/30 text-red-400 rounded px-3 py-2 text-xs hover:bg-red-500/20 transition-colors"
            >
              Cobrir Tudo
            </button>
          </div>
        </div>

        {/* Player view toggle */}
        <div>
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">
            Visão do Jogador
          </label>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_PLAYER_VIEW' })}
            className={`w-full py-2 rounded text-xs font-medium transition-colors ${
              state.showPlayerView
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:text-white'
            }`}
          >
            {state.showPlayerView ? '👁️ Visão do Jogador Ativa' : '🖥️ Ativar Visão do Jogador'}
          </button>
        </div>

        {/* Scene info */}
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Cena Atual</div>
          <div className="text-sm text-white font-semibold">O Templo Submerso</div>
          <div className="text-xs text-gray-500 mt-1">Câmera: ({Math.round(state.map.panOffset.x)}, {Math.round(state.map.panOffset.y)})</div>
        </div>
      </div>
    </div>
  );
}
